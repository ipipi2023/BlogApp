//Login User Controller to handle post request

const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

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
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        // Redirect or send an error message depending on your error handling strategy
        res.redirect('/auth/login');
    }
}



