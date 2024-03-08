const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database')

BlogPost.create({
    title: "Ipule Pipi",
    body: "I am an Engineer",
    message: "Hello"
}).then(blogpost => {
    console.log(blogpost)
}).catch(error => {
    console.error('error creating blogpost : ', error)
})