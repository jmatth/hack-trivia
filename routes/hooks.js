var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var voteCollector = require('../lib/voteCollector.js');

router.post('/sms', function(req, res) {
  var from = req.body.From;
  var message = req.body.Body;
  var matchAnswer = /^\s*\w/;
  var answer = from.match(matchAnswer)[0].trim();
  voteCollector.recordAnswer(from, answer);
});

module.exports = router;
