var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var voteCollector = require('../lib/voteCollector.js');

router.post('/sms', function(req, res) {
  var from = req.body.From;
  var message = req.body.Body;
  var matchAnswer = /^\s*\w/;
  var match = message.match(matchAnswer);
  if (!match)
    return;
  var answer = match[0].trim();
  console.log('Recording answer from ' + from);
  voteCollector.recordAnswer(from, answer.toUpperCase());
});

module.exports = router;
