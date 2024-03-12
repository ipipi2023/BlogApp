module.exports = (req, res) => {
    try {
        // Check if session userId exists
       /* if (req.session.userId) {
            // Session userId exists, render the create page
            console.log('worked!');
            res.render('create');
        } else {
            // No session userId, redirect to the login page
            res.redirect('/auth/login');
        }*/

        res.render('create')
    } catch (error) {
        // Handle any errors that occur during the try block execution
        console.error('Error handling request: ', error);
        
        // Optionally, send a generic error message to the client or redirect to a custom error page
        res.status(500).send('An error occurred');
        // Or redirect to a generic error page
        // res.redirect('/error');
    }
};
