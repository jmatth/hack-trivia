var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


exports.index = router;
exports.setup = require('./setup');
exports.hooks = require('./hooks');
exports.play = require('./play');
