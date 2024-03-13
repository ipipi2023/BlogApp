// Import dependencies
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Initialize express app
const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/my_database');

// Middleware setup
// Note: Session middleware is now placed before flash and custom middleware that depend on it
app.use(expressSession({
    secret: 'Hello World',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());
app.use(express.static('public')); // Serve static files
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set the view engine to ejs

// Global variable for user login status
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

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
const logoutController = require('./controllers/logout');

// Import middlewares
const postValidationMiddleware = require('./middlewares/postValidation');
const authMiddleWare = require('./middlewares/authMiddleware');
const redirectAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticated');

// Middleware for validating posts, placed right before the route it applies to
app.use('/posts/store', postValidationMiddleware);

// Routes
app.get('/', homePageController);
app.get('/about', aboutPageController);
app.get('/contact', contactPageController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleWare, newPostController);
app.get('/auth/register', redirectAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.post('/posts/store', authMiddleWare, storePostController);
app.post('/users/register', redirectAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectAuthenticatedMiddleware, loginUserController);

// Middleware for handling 404 Not Found
app.use((req, res) => res.render('notfound'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
