const Question = require('mongoose').model('Question');

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

exports.randomize = (req, res) => {
  var categories = []; 
  // categories.push(req.params.category1);
  // categories.push(req.params.category2);
  // categories.push(req.params.category3);
  // let numberOfQuestions = req.params.numberOfQuestions;
  categories.push("Sports");
  categories.push("Astronomy and Space");
  categories.push("Music");
  var numberOfQuestions = 10;
  var questionsEasy = [];
  var questionsMedium = [];
  var questionsHard = [];
  var finalQuestionsEasy = [];
  var finalQuestionsMedium = [];
  var finalQuestionsHard = [];                                               // the user's chosen number of questions
  var remainders = 0;  
  var randomizedNumber = 0;
  remainders = this.state.number % 3;
  numberOfQuestions = Math.floor(numberOfQuestions / 3);

  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
        // for(let i = 0; i < categories.length; i++){
        //     for(let j = 0; j < questions.length; j++){
        //         if(questions[j].category === categories[i]){
        //             if(questions[j].difficulty === 'Easy'){
        //                 questionsEasy.push(questions[j]);
        //             }
        //             else if(questions[j].difficulty === 'Medium'){
        //                 questionsMedium.push(questions[j]);
        //             }
        //             else if(questions[j].difficulty === 'Hard'){
        //                 questionsHard.push(questions[j]);
        //             }
        //         }
        //     }
        // }
        // for(let i = 0; i < numberOfQuestions; i++){
        //     randomizedNumber = Math.floor(Math.random() * (questionsEasy.length-1));  
        //     while(questionsEasy[randomizedNumber].found === true){            // found will be an attribute of a question
        //         randomizedNumber = Math.floor(Math.random() * (questionsEasy.length-1));  
        //     }
        //     finalQuestionsEasy.push(questionsEasy[randomizedNumber]);
        //     questionsEasy[randomizedNumber].found === true;   
        // }
        // for(let i = 0; i < numberOfQuestions; i++){
        //     randomizedNumber = Math.floor(Math.random() * (questionsMedium.length));
        //     while(questionsMedium[randomizedNumber].found === true){            // found will be an attribute of a question
        //         randomizedNumber = Math.floor(Math.random() * (questionsMedium.length-1));  
        //     }
        //     finalQuestionsMedium.push(questionsMedium[randomizedNumber]);
        //     questionsMedium[randomizedNumber].found === true;   
        // }
        // // Add the remainder
        // numberOfQuestions += remainders;
        // for(let i =0 ; i < numberOfQuestions; i++){
        //     randomizedNumber = Math.floor(Math.random() * (questionsHard.length-1)); 
        //     while(questionsHard[randomizedNumber].found === true){            // found will be an attribute of a question
        //         randomizedNumber = Math.floor(Math.random() * (questionsHard.length-1));  
        //     }
        //     finalQuestionsHard.push(questionsHard[randomizedNumber]);
        //     questionsHard[randomizedNumber].found === true;     
        // }
      res.send(JSON.stringify([[{
        _id: 1,
        question: "How did Spiderman get his superpowers?  ",
        difficulty: "Easy",
        category: "Superheroes",
        type: "Multiple Choice",
        choices: ["He was experimented on in a lab", "He trained hard to get his powers", "Bitten by radioactive spider", "He was born with it"] ,
        answer: "Bitten by radioactive spider"
        }],[{
          _id: 2,
        question: "The Sandman appears in which superhero movie? ",
        difficulty: "Medium",
        category: "Superheroes",
        type: "Multiple Choice",
        choices: ["Blade", "Spiderman3", "The Incredible Hulk", "X-men 2"] ,
        answer: "Spiderman3"
        }],[{
        _id: 3,
        question: "T or F. Is Dr. Victor Fries the alter ego of Mr. Freeze?  ",
        difficulty: "Hard",
        category: "Superheroes",
        type: "True or False",
        choices: ["True","False"] ,
        answer: "True"
        }]]));
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