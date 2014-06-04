var correctAnswer;
var candidates;

exports.newRound = function(newCorrect) {
  correctAnswer = newCorrect;
  candidates = {};
};

exports.recordAnswer = function(participant, answer) {
  candidates[participant] = answer == correctAnswer;
};

exports.chooseWinner = function() {
  var possibleWinners;

  for (var candidate in candidates) {
    if (candidates.hasOwnProperty(candidate) && candidates[candidate]) {
      possibleWinners.push(candidate);
    }
  }

  return possibleWinners[Math.floor((Math.random() * possibleWinners.length) + 1)];
};
