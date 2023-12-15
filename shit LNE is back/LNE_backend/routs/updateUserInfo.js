const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/userSchema');
const app = express();

const UserAcc= mongoose.model('User', User);
const multer = require('multer'); // Import multer
const path = require('path');



const storage = multer.diskStorage({
    destination: './public/photos', // Specify the directory where photos will be saved
    filename: (req, file, callback) => {
      // Generate a unique name for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      callback(null, uniqueSuffix + extension);
    },
  });

const upload = multer({ storage });
// Define the API endpoint
app.post('/updateUserInfo/:userID', upload.single('image'), async (req, res) => {
    try {
        const userID = req.params.userID;
        let { email, name, age, adress, city, bio } = req.body;
        

        const user = await UserAcc.findById(userID);

        let profilePic = user.profilePic; // Default profilePic

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.file) {
            profilePic = `/photos/${req.file.filename}`;
        }

        if(age == 0){
            age = user.age;
        }
        const updatedFields = {
            email: email || user.email,
            name: name || user.name,
            age: age || user.age,
            adress: adress || user.adress,
            city: city || user.city,
            bio: bio || user.bio,
            profilePic: profilePic,
            role: user.role // Assuming role shouldn't be updated here
        };

        const newUser = await UserAcc.findByIdAndUpdate(userID, updatedFields, { new: true });

        if (!newUser) {
            return res.status(500).json({ error: 'Failed to update user' });
        }

        res.status(200).send({ message: 'User updated successfully', updatedFields });
    } catch (err) {
        console.error('Failed to update user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});
module.exports = app;