const express = require('express');
const mongoose = require('mongoose');
const reportSchema = require('../schema/reportSchema')
const app = express();

const Rep = mongoose.model('Report',reportSchema)

// Define the API endpoint
app.post('/notban', async (req, res) => {
    try {
        let reportID = req.body.ID;
        console.log(reportID)
        await Rep.deleteOne({ '_id':reportID }).then(function(){
          console.log("Data deleted"); // Success
      }).catch(function(error){
          console.log(error); // Failure
      });;
        res.status(200).send({error:"you no banned"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to ban' });
  }
});


module.exports = app;