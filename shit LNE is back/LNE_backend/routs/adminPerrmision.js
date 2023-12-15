const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema')
const app = express();

const UserAcc = mongoose.model('User',User);

// Define the API endpoint
app.get('/adminPerrmision/:userID', async (req, res) => {
    try {
      let userID = req.params.userID;
      let role = "user";
      const user = await UserAcc.findOne({ _id: userID });
      
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
     if(user.role == "user"){
        role = "admin"
     }else{
        role = "user"
     }
  
      const newUser = await UserAcc.updateOne({_id:userID}, {role:role})
      newUser.acknowledged;
      res.status(200).send({error:"Sucesfully updated user"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cahnge permision' });
  }
});


module.exports = app;