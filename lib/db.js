var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


exports.connect = function(dbUri, dbOpts, callback) {
  if (typeof(dbOpts) === 'function') {
    callback = dbOpts;
    dbOpts = null;
  }

  mongoose.connect(dbUri, dbOpts, function() {
    if (typeof(callback) === 'function') {
      callback(arguments);
    }
  });
};

exports.disconnect = function(callback) {
  mongoose.connection.close(function() {
    if (typeof(callback) === 'function') {
      callback(arguments);
    }
  });
};


var QuestionSchema = new Schema({
    question: String
  , answers: {}
  , correctAnswer: String
});


function strToId(str) {
  var id;
  try {
    id = mongoose.Types.ObjectId(str);
  } catch (e) {
    id = null;
  }
  return id;
}


exports.Question = mongoose.model('Question', QuestionSchema);
exports.strToId = strToId;
