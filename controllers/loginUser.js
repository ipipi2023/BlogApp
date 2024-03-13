const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    // Check if either username or password is empty
    if (!username || !password) {
        // Optionally, you could use req.flash to send a message back to the user
        // indicating that both fields are required.
        req.flash('loginError', 'Username and password are required.');
        return res.redirect('/auth/login');
    }

    try {
        const user = await User.findOne({ username: username }).exec();
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                req.session.userId = user._id;
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } else {
            res.redirect('/auth/login');
        }
    }  catch (error) {
        console.error(error);
        res.redirect('/auth/login');
    }
};
