const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const app = express();


const userAcc = mongoose.model('User', User);

app.post('/login', async (req, res) => {
    try {
      const { email,password } = req.body;
      
      // find user in database
      const user = await userAcc.findOne({ email });
  
      if (!user) {
        // if user not found
        return res.status(404).json({ error: 'User not found' });
      }
  
      // compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        // if passwords don't match
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      // if user exists and passwords match
      res.status(200).send(user["_id"]);
    } catch (err) {
      console.error('Failed to login:', err);
      res.status(500).json({ error: 'Failed to login' });
    }
  });

module.exports = app;