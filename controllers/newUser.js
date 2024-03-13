//Registering Users Controller


module.exports = (req,res) => {
    let username = "";
    let password = "";
    //console.log(req.flash('data'));
    const data = req.flash('data')[0]; //get req.body data stored in flash data array
    
    if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
    }

    res.render('register', {
       // errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}