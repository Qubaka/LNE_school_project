const express = require('express');
const mongoose = require('mongoose');
const Item = require('../schema/itemSchema');
const app = express();

const item = mongoose.model('Item', Item);

// Define the API endpoint
app.get('/getItems', async (req, res) => {

  try {
    const items = await item.find({});

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});


module.exports = app;