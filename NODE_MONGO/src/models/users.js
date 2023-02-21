const mongoose=require("mongoose");
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

// pre save data in database
userschema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = mongoose.model("users",userschema)

module.exports = user