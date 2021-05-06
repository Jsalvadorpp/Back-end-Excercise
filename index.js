const serverless = require('serverless-http');
const express = require('express');
const app = express();

// set up api routes
app.use(require('./src/routes/index.routes'));

module.exports.handler = serverless(app);
