//post validation middle ware

module.exports = (req, res, next) => {
    let errors = [];
    if (!req.files) errors.push("File is missing.");
    if (!req.body.title || !req.body.title.trim()) errors.push("Title is missing.");
    if (!req.body.body || !req.body.body.trim()) errors.push("Body content is missing.");
    
    if (errors.length > 0) {
        req.flash('postValidation', errors.join(" "));
        return res.redirect('/posts/new');
    }
    
    next();
}


/*
module.exports = (req,res,next) => {
    if (req.files == null || req.body.title== null || req.body.body == null) {
       // console.log("worked");
        req.flash('postValidation', "Please fill in the necessary details!");
        return res.redirect('/posts/new');
    }
    //console.log("worked!")
    next()
}*/