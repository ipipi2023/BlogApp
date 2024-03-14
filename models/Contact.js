const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide full name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  message: {
    type: String,
    required: [true, 'Please fill in the message']
  }
}, { timestamps: true });

//error handdling for contraint set my mongoose schema
contactSchema.plugin(uniqueValidator);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
