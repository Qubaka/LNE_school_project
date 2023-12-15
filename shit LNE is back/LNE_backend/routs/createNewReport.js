const express = require('express');
const mongoose = require('mongoose');

const report = require('../schema/reportSchema');
const app = express();

const Report = mongoose.model('report', report);


app.post('/report/:userID', async (req, res) => {
    try {
        let IdOfReportedUser = req.params.userID;
        let titleVar = req.body.title;
        let descriptionVar = req.body.description;  
    

        if (!titleVar) {
          // Handle the case when passwordVar is undefined or empty
          return res.status(400).json({ error: 'Name is required' });
        }
        if (!descriptionVar) {
            // Handle the case when passwordVar is undefined or empty
            return res.status(400).json({ error: 'Description is required' });
        }
    
        const newReport = new Report({
            title:titleVar,
            description:descriptionVar,
            IdOfReportedUser:IdOfReportedUser
        });
    

        await newReport.save();
        res.status(200).json({ error: 'you reported' });
      } catch (err) {
        console.error('Failed to put up item on sale:', err);
        res.status(500).json({ error: 'Failed to add item to MongoDB' });
      }
    });

    module.exports = app;