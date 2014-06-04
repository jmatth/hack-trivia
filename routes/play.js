var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var voteCollector = require('../lib/voteCollector');
var phone = require('../lib/phone');

var questions;

router.get('/', function(req, res) {
  questions = db.Question.find().lean().exec(function (err, foundQuestions) {
    questions = foundQuestions;
    res.redirect('/play/q?index=0');
  });
});

router.get('/q', function(req, res) {
  var index = parseInt(req.query.index);
  if (index >= questions.length)
    return res.redirect('/end');
  var question = questions[index];
  var options = Object.keys(question.answers).sort();

  voteCollector.newRound(question.correctAnswer);
  res.render('play/question.jade', { question: question, options: options, index: index });
});

router.get('/winner', function(req, res) {
  var winner = voteCollector.chooseWinner();
  var index = parseInt(req.query.index);
  var question = questions[index];
  res.render('play/winner.jade', { winner: winner, question: question, index: index });
  phone.sms(winner, "Congrats, you won! Come to the front to claim your prize.");
});

module.exports = router;
