const express = require('express');
const mongoose = require('mongoose');

const report = require('../schema/reportSchema');
const app = express();

const Report = mongoose.model('report', report);


app.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find({});

        res.json(reports);
        res.status(200);
      } catch (err) {
        console.error('Failed to put up item on sale:', err);
        res.status(500).json({ error: 'Failed to add item to MongoDB' });
      }
    });

    module.exports = app;