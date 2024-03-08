//post validation middle ware
module.exports = (req,res,next) => {
    if (req.files == null || req.body.title== null || req.body.body == null) {
       // console.log("worked");
        return res.redirect('/posts/new');
    }
    //console.log("worked!")
    next()
}