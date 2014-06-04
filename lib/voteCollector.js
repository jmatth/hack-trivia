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
  var possibleWinners = [];
  var winner;

  for (var candidate in candidates) {
    if (candidates.hasOwnProperty(candidate) && candidates[candidate]) {
      possibleWinners.push(candidate);
    }
  }

  if (possibleWinners.length === 0)
    return 'No Candidates :(';

  winner = possibleWinners[Math.floor(Math.random() * (possibleWinners.length - 1))];
  return winner;
};
