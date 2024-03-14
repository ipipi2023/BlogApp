module.exports = (req,res) => {
    let name = "";
    let email = "";
    let phone = "";
    let message = "";

    const data = req.flash('data')[0];
    console.log(data);

    if (typeof data != "undefined") {
        name = data.name;
        email = data.email;
        phone = data.phone;
        message = data.message;
    }

    res.render('contact', {
        errors: req.flash('validationError'),
        name: name,
        email: email,
        phone: phone,
        message: message
    })
}


/*
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
*/