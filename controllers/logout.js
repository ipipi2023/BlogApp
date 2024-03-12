//logout controller

module.exports = (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            // Log the error, handle it, or notify the user
            console.error("Session destruction error:", err);
            return res.status(500).send("Could not log out. Please try again.");
        }
        res.redirect('/');
    });
    
}