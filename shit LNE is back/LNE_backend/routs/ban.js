const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema')
const Item = require('../schema/itemSchema')
const reportSchema = require('../schema/reportSchema')
const app = express();

const UserAcc = mongoose.model('User', User);
const Items = mongoose.model('Item', Item);
const Rep = mongoose.model('Report',reportSchema)
// Define the API endpoint
app.post('/ban/:userID', async (req, res) => {

    try {
        let userID = req.params.userID;
        let role ="banned";
        let reportID = req.body.ID;
        const newUser = await UserAcc.updateOne({_id:userID}, {role:role})
        await Items.deleteMany({ 'userId': userID })
        .then(() =>{
          console.log("posts deleted");
        })
        .catch((error) => {
          console.log(error);
        }); 
        newUser.acknowledged;
        if(reportID != null){
          await Rep.deleteOne({ '_id':reportID }).then(function(){
              console.log("Data deleted"); // Success
          }).catch(function(error){
              console.log(error); // Failure
          });;
          Rep.deleteOne({_id:reportID});
        }
        
        
        res.status(200).send({error:"Sucesfully ban user"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to ban' });
  }
});


module.exports = app;