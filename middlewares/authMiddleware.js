//middleware for authenticating users before giving them access to certain pages

const User = require('../models/User');

module.exports = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        // Optionally, add a flash message or similar to notify the user
        console.log("Session or userId not found");
        return res.redirect('/');
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            // Optionally, add a flash message or similar to notify the user
            console.log("User not found");
            return res.redirect('/');
        }

        next();
    } catch (error) {
        console.error("Error authenticating user: ", error);
        // Consider differentiating between user-not-found vs. other errors
        // Optionally, redirect to a different error page for non-user-not-found errors
        return res.redirect('/');
    }
};
