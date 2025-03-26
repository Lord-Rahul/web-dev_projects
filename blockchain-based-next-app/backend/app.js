const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const adminRoutes = require('./routes/admin');
const candidateRoutes = require('./routes/candidates');
const resultRoutes = require('./routes/results');
const voterRoutes = require('./routes/voters');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api/admin', adminRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/voters', voterRoutes);
app.use(errorHandler);

// Database connection
mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;