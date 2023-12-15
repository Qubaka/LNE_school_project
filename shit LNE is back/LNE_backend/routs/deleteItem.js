const express = require('express');
const mongoose = require('mongoose');
const Item = require('../schema/itemSchema')
const app = express();


const Items = mongoose.model('Item', Item);

app.post('/delItem/:itemId', async (req, res) => {

    try {
        const itemId = req.params.itemId;

        await Items.deleteMany({ '_id': itemId })
        .then(() =>{
          console.log("item deleted");
        })
        .catch((error) => {
          console.log(error);
        }); 
        
        res.status(200).send({error:"Sucesfully delete user"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to ban' });
  }
});


module.exports = app;