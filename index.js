const serverless = require('serverless-http');
const express = require('express');
require('dotenv').config();

// initialize express app
const app = express();

// initialize database
require('./src/config/database');

// packages middlewares
app.use(express.json({ limit: '10mb' })); // for parsing application/json

// set up api routes
app.use(require('./src/routes/index.routes'));
app.use(require('./src/routes/currencyFormat.route'));

module.exports.handler = serverless(app);
