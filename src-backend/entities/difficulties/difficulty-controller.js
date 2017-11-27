const Question = require('mongoose').model('Difficulty');


exports.findAll = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(questions);
    }
  });
}

exports.add = (req, res) => {
  const newQuestion = new Question(req.body);

  newQuestion.save((err, question) => {
    if (err) { res.send({}); }
    else {
      res.json(question);
    }
  });
}

exports.update = (req, res) => {
  const newQuestion = new Question(req.body);

  newQuestion.save((err, question) => {
    if (err) { res.send({}); }
    else {
      res.json(question);
    }
  });
}

exports.delete = (req, res) => {
  const _id = req.body._id;

  Question.remove({ _id }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}