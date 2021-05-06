const serverless = require('serverless-http');
const express = require('express');
require('dotenv').config();

// initialize express app
const app = express();

// initialize database
require('./src/config/database');

// set up api routes
app.use(require('./src/routes/index.routes'));

module.exports.handler = serverless(app);
