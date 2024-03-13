//login user contoller

module.exports = (req,res) => {
   // console.log(req.flash('loginError'));
    //console.log(req.flash('validationErrors'))
    res.render('login', {
        errors: req.flash('loginError'),
        
    });
}