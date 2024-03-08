// Import dependencies
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload'); //handle fileupload
const expressSession = require('express-session');


//connecting to database 
mongoose.connect('mongodb://localhost/my_database');

// Import controllers
const homePageController = require('./controllers/homePage');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const getPostController = require('./controllers/getPost');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

//import middlwares 
const postValidationMiddleware = require('./middlewares/postValidation');
const authMiddleWare = require('./middlewares/authMiddleware');
// Initialize express app
const app = express();

// Middleware setup

app.use(express.static('public'));// get static files 
app.use(fileUpload())//fileupload- image in this case
app.set('view engine', 'ejs'); // ejs
app.use(bodyParser.json()); //parse incomming request bodies in JSON formate and make it available in req.body of the route handler
app.use(bodyParser.urlencoded({extended:true})); //parse incomming request bodies encoded in URL-encoded formate and made available in req.body of the route handler
app.use('/posts/store', postValidationMiddleware); //Validate post from user 
app.use(expressSession({
    secret: 'Hello World',
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
}));

// Routes
//Get
app.get('/', homePageController); //Home
app.get('/about', aboutPageController) // get about page
app.get('/contact', contactPageController); // get contacts
app.get('/post/:id', getPostController); //open blog page
app.get('/posts/new',authMiddleWare, newPostController); //authenticate user then get the users the new blogpage
app.get('/auth/register', newUserController); //get the register page for new users to register
app.get('/auth/login', loginController) //get login page



//getting list of blogposts


//POST
//take in sumitted post by users and store in datebase
app.post('/posts/store', storePostController);
app.post('/users/register', storeUserController);
app.post('/users/login', loginUserController);



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
