const mongoose = require('mongoose');
const { Schema } = mongoose;

const reports = new Schema({
  title:String,
  description:String,
  IdOfReportedUser:String,
});

module.exports = reports;
