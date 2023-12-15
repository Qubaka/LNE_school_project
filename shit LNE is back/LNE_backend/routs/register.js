const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema');
const app = express();
const bcrypt = require('bcrypt');

const userAcc = mongoose.model('User', User);

app.post('/register', async (req, res) => {
  try {
    let emailVar = req.body.email;
    let nameVar = req.body.name;
    let reppaswordVar = req.body.reppasword;
    let paswordVar = req.body.pasword;

    if (!emailVar) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!nameVar) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!paswordVar) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(paswordVar, salt);

    const newUser = new userAcc({
      email: emailVar,
      name: nameVar,
      password: hashedPasword,
      role: "user",
      profilePic:`/photos/default.jpg`,
    });


    if (reppaswordVar != paswordVar) {
      res.status(400).json({ error: 'Pasword is missmatching' });
    }else{
      await newUser.save();
      res.status(200).json({ error: 'you are in' });
    }
  } catch (err) {
    console.error('Failed to add user:', err);
    res.status(500).json({ error: 'Failed to add user to MongoDB' });
  }
});

module.exports = app;