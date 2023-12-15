const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema');
const app = express();

const UserData = mongoose.model('User', User);

// Define the API endpoint
app.get('/getUserData/:userID', async (req, res) => {
    try {
        let userID = req.params.userID;
        
        const user = await UserData.findOne({ _id: userID });
    
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
    

        res.status(200).json({ email: user.email, profilePic: user.profilePic,name: user.name, age: user.age,adress: user.adress, city: user.city, adress: user.adress, bio:user.bio, role:user.role });
    } catch (err) {
        console.error('Failed to find user:', err);
        res.status(500).json({ error: 'Failed to find user' });
    }
  });

module.exports = app;