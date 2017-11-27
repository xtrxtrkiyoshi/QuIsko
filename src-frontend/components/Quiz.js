import React, { Component } from 'react';

class Quiz extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: [this.props.match.params.category1, this.props.match.params.category2, this.props.match.params.category3],
			number: this.props.match.params.number,
			questions: [],
			questionseasy: [],
			questionsmedium: [],
			questionshard: []
		}
	}

	componentDidMount() {
		var categories = []; 
		categories.push(this.state.selected[0]);
		categories.push(this.state.selected[1]);
		categories.push(this.state.selected[2]);
		var numberOfQuestions = this.state.number;
		var questionsEasy = [];
		var questionsMedium = [];
		var questionsHard = [];
		var finalQuestionsEasy = [];
		var finalQuestionsMedium = [];
		var finalQuestionsHard = [];                                               // the user's chosen number of questions
		var remainders = 0;  
		var randomizedNumber = 0;
		remainders = numberOfQuestions % 3;
		numberOfQuestions = Math.floor(numberOfQuestions / 3);

		fetch('http://localhost:3001/questions/find-all')
		.then((response) => { return response.json() })
		.then((result) => {
			for(let i = 0; i < categories.length; i++){
				for(let j = 0; j < result.length; j++){	
					if(result[j].category == categories[i]){
						if(result[j].difficulty === 'Easy'){
							questionsEasy.push(result[j]);
						}
						else if(result[j].difficulty === 'Medium'){
							questionsMedium.push(result[j]);
						}
						else if(result[j].difficulty === 'Hard'){
							questionsHard.push(result[j]);
						}
					}
				}
			}
			
			for(let i = 0; i < numberOfQuestions; i++){
				randomizedNumber = Math.floor(Math.random() * (questionsEasy.length-1));  
				while(questionsEasy[randomizedNumber].found){            // found will be an attribute of a question
					randomizedNumber = Math.floor(Math.random() * (questionsEasy.length-1));  
				}
				finalQuestionsEasy.push(questionsEasy[randomizedNumber]);
				questionsEasy[randomizedNumber].found = true;   
			}

			for(let i = 0; i < numberOfQuestions; i++){
				randomizedNumber = Math.floor(Math.random() * (questionsMedium.length));
				while(questionsMedium[randomizedNumber].found){            // found will be an attribute of a question
					randomizedNumber = Math.floor(Math.random() * (questionsMedium.length-1));  
				}
				finalQuestionsMedium.push(questionsMedium[randomizedNumber]);
				questionsMedium[randomizedNumber].found = true;   
			}
			// Add the remainder
			numberOfQuestions += remainders;

			for(let i =0 ; i < numberOfQuestions; i++){
				randomizedNumber = Math.floor(Math.random() * (questionsHard.length-1)); 
				while(questionsHard[randomizedNumber].found){            // found will be an attribute of a question
					randomizedNumber = Math.floor(Math.random() * (questionsHard.length-1));  
				}
				finalQuestionsHard.push(questionsHard[randomizedNumber]);
				questionsHard[randomizedNumber].found = true;     
			}

			{
				finalQuestionsEasy.map((question) => {
					question.found = false;
				})
			}
			{
				finalQuestionsMedium.map((question) => {
					question.found = false;
				})
			}
			{
				finalQuestionsHard.map((question) => {
					question.found = false;
				})
			}

			this.setState({questionseasy: finalQuestionsEasy, questionsmedium: finalQuestionsMedium, questionshard: finalQuestionsHard});
		}).catch((e) => { console.log(e); });
	}

	onChange(e) {
		console.log(e.target.value.toLowerCase() + "=>" + e.target.getAttribute('data-answer').toLowerCase())
		if(e.target.getAttribute('data-difficulty') === "Easy"){
			const questionseasy = this.state.questionseasy
			{
				questionseasy.map((question) => {

					if(e.target.getAttribute('data-id') == question._id){
						console.log(e.target.value.toLowerCase() === e.target.getAttribute('data-answer').toLowerCase())
						if(e.target.value.toLowerCase() === e.target.getAttribute('data-answer').toLowerCase()){
							question.found = true
							{console.log("Set true")}
						}else{
							question.found = false
							{console.log("Set false")}
						}
						
					}
				})
			}
			this.setState({questionseasy: questionseasy})
		}else if(e.target.getAttribute('data-difficulty') === "Medium"){
			const questionsmedium = this.state.questionsmedium
			{
				questionsmedium.map((question) => {

					if(e.target.getAttribute('data-id') == question._id){
						if(e.target.value.toLowerCase() === e.target.getAttribute('data-answer').toLowerCase()){
							question.found = true
							{console.log("Set true")}
						}else{
							question.found = false
							{console.log("Set false")}
						}
						
					}
				})
			}
			this.setState({questionsmedium: questionsmedium})
		}else if(e.target.getAttribute('data-difficulty') === "Hard"){
			const questionshard = this.state.questionshard
			{
				questionshard.map((question) => {

					if(e.target.getAttribute('data-id') == question._id){
						if(e.target.value.toLowerCase() === e.target.getAttribute('data-answer').toLowerCase()){
							question.found = true
							{console.log("Set true")}
						}else{
							question.found = false
							{console.log("Set false")}
						}
						
					}
				})
			}
			this.setState({questionshard: questionshard})
		}
	}

	getScore() {
		var score = 0;
		{
			this.state.questionseasy.map((question) => {
				if(question.found){
					score+=1;
				}
			})
		}

		{
			this.state.questionsmedium.map((question) => {
				if(question.found){
					score+=1;
				}
			})
		}

		{
			this.state.questionshard.map((question) => {
				if(question.found){
					score+=1;
				}
			})
		}
		{console.log(score)}

		return score;
	}

	render() {
		return(
			<div className="body">
				<div className="header"> <h1>Quiz </h1> </div>
				<div>
					<ol>	
			        	{
			        		this.state.questionseasy.map((q) => {
			        			return(
			        				<li key={q._id}>
			        					<div className="question">
			        						<br/>{q.question} <br/>
			        						{q.type==="Multiple Choice"?
			        							<div>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[0]} onClick={this.onChange.bind(this)}/> {q.choices[0]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[1]} onClick={this.onChange.bind(this)}/> {q.choices[1]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[2]} onClick={this.onChange.bind(this)}/> {q.choices[2]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[3]} onClick={this.onChange.bind(this)}/> {q.choices[3]} <br/>
			        							</div>:null}
			        						{q.type==="True or False"?
			        							<div>
													<input type="radio" name="tof" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[0]} onClick={this.onChange.bind(this)}/> {q.choices[0]} <br/>
													<input type="radio" name="tof" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[1]} onClick={this.onChange.bind(this)}/> {q.choices[1]} <br/>
			        							</div>:null}
			        						{q.type==="Text Answer"?
			        							<input type="text" name="ta" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} onChange={this.onChange.bind(this)}/>:null}
			        						{q.type==="Number Answer"?
			        							<input type="number" name="na" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} onChange={this.onChange.bind(this)}/>:null}

			        						<br/> Category: {q.category} <br/> Difficulty: {q.difficulty}
			        					</div>
			        				</li>
			        			)
			        		})
			        	}
		        	</ol>

		        	<ol>	
			        	{
			        		this.state.questionsmedium.map((q) => {
			        			return(
			        				<li key={q._id}>
			        					<div className="question">
			        						<br/>{q.question} <br/>
			        						{q.type==="Multiple Choice"?
			        							<div>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[0]} onClick={this.onChange.bind(this)}/> {q.choices[0]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[1]} onClick={this.onChange.bind(this)}/> {q.choices[1]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[2]} onClick={this.onChange.bind(this)}/> {q.choices[2]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[3]} onClick={this.onChange.bind(this)}/> {q.choices[3]} <br/>
			        							</div>:null}
			        						{q.type==="True or False"?
			        							<div>
			        								<input type="radio" name="tof" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value="True" onClick={this.onChange.bind(this)}/> {q.choices[0]} <br/>
			        								<input type="radio" name="tof" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value="False" onClick={this.onChange.bind(this)}/> {q.choices[1]} <br/>
			        							</div>:null}
			        						{q.type==="Text Answer"?
			        							<input type="text" name="ta" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} onChange={this.onChange.bind(this)}/>:null}
			        						{q.type==="Number Answer"?
			        							<input type="number" name="na" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} onChange={this.onChange.bind(this)}/>:null}

			        						<br/> Category: {q.category} <br/> Difficulty: {q.difficulty}
			        					</div>
			        				</li>
			        			)
			        		})
			        	}
		        	</ol>

		        	<ol>	
			        	{
			        		this.state.questionshard.map((q) => {
			        			return(
			        				<li key={q._id}>
			        					<div className="question">
			        						<br/>{q.question} <br/>
			        						{q.type==="Multiple Choice"?
			        							<div>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[0]} onClick={this.onChange.bind(this)}/> {q.choices[0]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[1]} onClick={this.onChange.bind(this)}/> {q.choices[1]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[2]} onClick={this.onChange.bind(this)}/> {q.choices[2]} <br/>
			        								<input type="radio" name="mc" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value={q.choices[3]} onClick={this.onChange.bind(this)}/> {q.choices[3]} <br/>
			        							</div>:null}
			        						{q.type==="True or False"?
			        							<div>
			        								<input type="radio" name="tof" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value="True" onClick={this.onChange.bind(this)}/> True <br/>
			        								<input type="radio" name="tof" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} value="False" onClick={this.onChange.bind(this)}/> False <br/>
			        							</div>:null}
			        						{q.type==="Text Answer"?
			        							<input type="text" name="ta" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} onChange={this.onChange.bind(this)}/>:null}
			        						{q.type==="Number Answer"?
			        							<input type="number" name="na" data-id={q._id} data-difficulty={q.difficulty} data-answer={q.answer} onChange={this.onChange.bind(this)}/>:null}

			        						<br/> Category: {q.category} <br/> Difficulty: {q.difficulty}
			        					</div>
			        				</li>
			        			)
			        		})
			        	}
		        	</ol>
				</div>
				<div>
					<a href={`/submit/${this.state.selected[0]}/${this.state.selected[1]}/${this.state.selected[2]}/${this.getScore()}`}> <button className="submit-quiz"> Submit </button> </a> <br/>
				</div>			
			</div>
		);
	}
}

export default Quiz;