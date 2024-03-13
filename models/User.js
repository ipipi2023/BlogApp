const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


const bcrypt = require('bcrypt');


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'], // Indicates the username must be provided
    unique: true //unique
  },
  password: {
    type: String,
    required: [true, 'Please provide password'] // Indicates the password must be provided
  }
});

//error handdling for contraint set my mongoose schema
UserSchema.plugin(uniqueValidator);


UserSchema.pre('save', async function(next) {
  try {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    console.log('hashed');
    next();
  } catch (error) {
    console.error("error hashing: ",error);
    // Handle error appropriately, maybe pass it to next() or throw it
    next(error); // Pass error to next middleware or callback
  }
});

//export model
const User = mongoose.model('User', UserSchema);
module.exports = User;