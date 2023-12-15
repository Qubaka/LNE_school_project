const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema');
const app = express();

const UserData = mongoose.model('User', User);

// Define the API endpoint
app.get('/getUser', async (req, res) => {
    try {
        const user = await UserData.find().exec();
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
    
        const userData = user.map(user => {
            const _id = user._id;
            const email = user.email;
            const role = user.role;
            return { _id,email, role };
        });
        res.status(200).json(userData);
    } catch (err) {
        console.error('Failed to find user:', err);
        res.status(500).json({ error: 'Failed to find user' });
    }
  });

module.exports = app;