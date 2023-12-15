const express = require('express');
const mongoose = require('mongoose');
const item = require('../schema/itemSchema');
const app = express();

const ItemOnSale = mongoose.model('Item', item);



app.post('/buy/:userID/:itemID', async (req, res) => {
  try {
    const IdOfUser = req.params.userID;
    const IdOfItem = req.params.itemID;
    const item = await ItemOnSale.findOne({ _id: IdOfItem });
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const newItem = await ItemOnSale.updateOne({_id:IdOfItem}, {buyerId:IdOfUser});
    newItem.acknowledged;
    res.status(200).json({ message: 'bought sucesfully' });
  } catch (err) {
    console.error('Failed to buy item', err);
    res.status(500).json({ error: 'failed to buy thing in shop' });
  }
});
module.exports = app;