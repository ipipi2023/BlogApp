const Contact = require('../models/Contact'); 

exports.submitContactForm = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.status(201).send("Form submitted successfully.");
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
      console.log(validationErrors);
      req.flash('validationError', validationErrors);
      req.flash('data', req.body);
      res.redirect('/contact');
    } else {
      console.error(error);
      res.status(500).send("An unexpected error occurred.");
    }
  }
};

/*
const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log(validationErrors);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        //req.session.validationErrors = validationErrors;
        res.redirect('/auth/register');
*/




