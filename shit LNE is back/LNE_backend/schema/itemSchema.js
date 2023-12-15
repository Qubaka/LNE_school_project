const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  description:String,
  photo:String,
  price:String,
  userId:String,
  tag:String,
  deliveryStatus:String,
  buyerId:String,
});

module.exports = itemSchema;
