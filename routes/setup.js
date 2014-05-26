var express = require('express');
var router = express.Router();
var db = require('../lib/db');


router.get('/', function(req, res) {
  db.Question.find(function(err, questions) {
    if (err) {
      throw err;
    }
    res.render('setup/index', { questions: questions });
  });
});

router.get('/new', function(req, res) {
  var dummyQuestion = {
    correctAnswer: 'A'
  , answers: {
      A: ''
    , B: ''
    , C: ''
    , D: ''
    , E: ''
    }
  };
  res.render('setup/edit', { question: dummyQuestion, formAction: 'add' });
});

router.post('/saveQuestion', function(req, res) {
  var correct;
  if (req.body.inputQuestion === '') {
    //TODO: flash
    res.redirect('./new');
  } else if (typeof req.body.isCorrect === 'undefined' || req.body.isCorrect === '' ||
             req.body.isCorrect.charCodeAt(0) < 65 || req.body.isCorrect.charCodeAt(0) > 69) {
    //TODO: flash
    res.redirect('./new');
  }

  correct = req.body.isCorrect;

  if(req.body['inputAnswer' + correct] === '') {
    //TODO: flash
    res.redirect('./new');
  }

  var questionObj = {};

  questionObj.question = req.body.inputQuestion;
  questionObj.answers = {
    'A': req.body.inputAnswerA
  , 'B': req.body.inputAnswerB
  , 'C': req.body.inputAnswerC
  , 'D': req.body.inputAnswerD
  , 'E': req.body.inputAnswerE
  };
  questionObj.correctAnswer = req.body.isCorrect;

  if (typeof req.body._id === 'undefined') {
    var question = new db.Question(questionObj);
    question.save(function(err) {
      if (err) throw err;
      res.redirect('./');
    });
  } else {
    db.Question.update({ _id: req.body._id }, { $set: questionObj }, function(err) {
      if (err) throw err;
      res.redirect('./');
    });
  }
});

router.get('/deleteQuestion', function(req, res) {
  if (typeof req.query._id === 'undefined') {
    //TODO: flash
    res.redirect('./');
  }
  db.Question.findOneAndRemove({ _id: req.query._id }, function(err) {
    if (err) throw err;
    res.redirect('./');
  });
});

router.get('/question', function(req, res) {
  var id;
  if (typeof req.query._id === 'undefined') {
    //TODO: flash
    return res.redirect('./');
  }

  id = req.query._id;
  db.Question.findOne({ _id: id }, function(err, question) {
    if (err) throw err;
    if (typeof question === 'undefined'){
      //TODO flash
      return res.redirect('./');
    }
    res.render('setup/edit', { question: question, formAction: 'modify' });
  });
});


function decChar(c) {
  if (c.length !== 1) throw 'Not a char';
  return String.fromCharCode(c.charCodeAt(0) - 1);
}


module.exports = router;
