const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
  username: String,
  password: String
});

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