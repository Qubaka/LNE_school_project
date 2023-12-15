const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  name:String,
  password:String,
  age: String,
  adress:String,
  city:String,
  bio:String,
  role:String,
  adress:String,
  profilePic:String,
});

module.exports = userSchema;
