var twilio;

var fromNumber;

exports.config = function(sid, token, number) {
  twilio = require('twilio')(sid, token);
  fromNumber = number;
};

exports.sms = function(to, body) {
  console.log('Sending sms to ' + to);
  twilio.sendMessage({ to: to, from: fromNumber, body: body }, function(err) {
    if (err)
      console.log(err);
  });
};
