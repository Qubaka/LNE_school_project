const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); // Import multer
const path = require('path');

const item = require('../schema/itemSchema');
const app = express();

const ItemOnSale = mongoose.model('Item', item);


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
app.post('/put_up_for_sale/:userID', upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    const IdOfUser = req.params.userID;
    const nameVar = req.body.name;
    const descriptionVar = req.body.description;
    const priceVar = req.body.price;
    const tagVar = req.body.tag;

    if (!nameVar || !descriptionVar || !priceVar) {
      return res.status(400).json({ error: 'Name, description, and price are required' });
    }

    const newItem = new ItemOnSale({
      name: nameVar,
      description: descriptionVar,
      photo: `/photos/${req.file.filename}`, // Access the uploaded file using req.file.filename
      price: priceVar,
      userId: IdOfUser,
      tag: tagVar,
      buyer: null,
    });

    await newItem.save();
    res.status(200).json({ message: 'Item added for sale' });
  } catch (err) {
    console.error('Failed to put up item on sale:', err);
    res.status(500).json({ error: 'Failed to add item to MongoDB' });
  }
});
    module.exports = app;