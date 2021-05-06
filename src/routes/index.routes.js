var express = require('express');
var router = express.Router();
const index = require('../controllers/index.controller');

/* GET home page. */
router.get('/home', index.welcome);
router.get('/user', index.users);

module.exports = router;
