const User = require('../models/User');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        // Handle error appropriately, such as rendering an error page or displaying a flash message
        //redirect user back to registration page for now
        res.redirect('/auth/register')
        //res.status(500).send('Internal Server Error');

    }
}
