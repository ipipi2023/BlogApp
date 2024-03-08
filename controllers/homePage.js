    //HomePage Controller

const BlogPost = require("../models/BlogPost");

    module.exports = async (req,res) => {
        //finding blogpost list and sending passing to be rendered in the index.ejs
        const blogposts = await BlogPost.find({});
        console.log(req.session);//log the req session data
        res.render('index', {
            blogposts: blogposts
        })
    }
  
