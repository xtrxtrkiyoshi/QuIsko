const Highscore = require('mongoose').model('HighScore');

exports.findAll = (req, res) => {
  Highscore.find({}, (err, highscores) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(highscores);
    }
  });
}

exports.add = (req, res) => {
  const newHighscore = new Highscore(req.body);
  newHighscore.save((err, highscore) => {
    if (err) { res.send({}); }
    else {
      res.json(highscore);
    }
  });
}