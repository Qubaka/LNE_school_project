const express = require('express');
const mongoose = require('mongoose');
const Item = require('../schema/itemSchema');
const app = express();

const item = mongoose.model('Item', Item);

// Define the API endpoint
app.get('/getBoughtItems/:userID', async (req, res) => {

  try {
    const userID = req.params.userID;
    const items = await item.find({buyerId:userID});

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});


module.exports = app;