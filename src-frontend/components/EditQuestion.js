import React, { Component } from 'react';


class EditQuestion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.match.params._id,
			//inputs
			question: "",
			difficulty: "",
			category: "",
			type: "",
			choices: [],
			answer: "",
			//choices
			difficultyChoice: ["Easy", "Medium", "Hard"],
			catChoice:[],
			typeChoice: ["Multiple Choice", 
						"True or False",
						"Text Answer",
						"Number Answer"],
			//errors
			errorQuestion: "",
			errorAnswer: "",
			errorDifficulty: "",
			errorCategory: "",
			errorType: "",
			errorC1: "",
			errorC2: "",
			errorC3: "",
			errorC4: "",
			//choices holders
			choice1: "",
			choice2: "",
			choice3: "",
			choice4: ""
		}

		this.handleAnswer = this.handleAnswer.bind(this);				
		this.handleCategory = this.handleCategory.bind(this);
		this.handleDifficulty = this.handleDifficulty.bind(this);
		this.handleQuestion = this.handleQuestion.bind(this);
		this.handleType = this.handleType.bind(this);
		this.handleChoice1 = this.handleChoice1.bind(this);
		this.handleChoice2 = this.handleChoice2.bind(this);
		this.handleChoice3 = this.handleChoice3.bind(this);
		this.handleChoice4 = this.handleChoice4.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleAnswer(e) {
		this.setState({ answer: e.target.value });
	}

	handleCategory(e) {
		this.setState({ category: e.target.value });
	}

	handleDifficulty(e) {
		this.setState({ difficulty: e.target.value });
	}

	handleQuestion(e) {
		this.setState({ question: e.target.value });
	} 

	handleType(e) {
		this.setState({ type: e.target.value });
	}

	handleChoice1(e) {
		this.setState({ choice1: e.target.value });
	}

	handleChoice2(e) {
		this.setState({ choice2: e.target.value });
	}

	handleChoice3(e) {
		this.setState({ choice3: e.target.value });
	}

	handleChoice4(e) {
		this.setState({ choice4: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		//reset all errors
		this.setState({
			errorQuestion: "",
			errorDifficulty: "",
			errorCategory: "",
			errorType: "",
			errorAnswer: "",
			errorC1: "",
			errorC2: "",
			errorC3: "",
			errorC4: ""
		});
		//checks for errors
		if(this.state.question === "") 		{ this.setState({ errorQuestion: "Question is Required" }); }
		if(this.state.difficulty === "") 	{ this.setState({ errorDifficulty: "Difficulty is Required" }); }
		if(this.state.category === "") 		{ this.setState({ errorCategory: "Category is Required" }); }
		if(this.state.type === "") 			{ this.setState({ errorType: "Type is Required" }); }
		if(this.state.answer === "") 		{ this.setState({ errorAnswer: "Answer is Required" }); }
		if(this.state.type === "Multiple Choice") { 
			if(this.state.choice1 === "") { this.setState({ errorC1: "This field is required." }); }
			if(this.state.choice2 === "") { this.setState({ errorC2: "This field is required." }); }
			if(this.state.choice3 === "") { this.setState({ errorC3: "This field is required." }); }
			if(this.state.choice4 === "") { this.setState({ errorC4: "This field is required." }); }
		}

		if(this.state.errorQuestion === "" && this.state.errorDifficulty === "" && 
			this.state.errorCategory === "" && this.state.errorType === "" && this.state.errorAnswer === "" 
			&& this.state.errorC1 === "" && this.state.errorC2 === "" && this.state.errorC3 === "" && this.state.errorC4 === "") {
			console.log("welp");
			//add questions to database
				fetch('http://localhost:3001/questions/update', { 
				//add second param with method POST to post, and header because theres a body
				//stringiy because only accepts strings
					method: 'POST',
					body: JSON.stringify({
						question: this.state.question,
						difficulty: this.state.difficulty,
						category: this.state.category,
						type: this.state.type,
						choices: this.state.choices,
						answer: this.state.answer,
						found: false
					}),
					headers: { 'Content-Type': 'application/json' },
					credentials: 'same-origin'
				})
			  	 .then((response) => {
			  	 	//reset everything
			  	 	return response.json(); })
			  	 .then((result) => {
			  	 	//notification for success
			  	 	console.log("Successfully added!");
			  	 	this.setState({ success: "Succesfully Added" });
			  	 })
			  	  .catch((e) => { console.log(e); });

			  	  this.setState({
						question: "",
						difficulty: "",
						category: "",
						type: "",
						choices: [],
						answer: "",
						//errors
						errorQuestion: "",
						errorAnswer: "",
						errorDifficulty: "",
						errorCategory: "",
						errorType: "",
						errorC1: "",
						errorC2: "",
						errorC3: "",
						errorC4: "",
						//choices holders
						choice1: "",
						choice2: "",
						choice3: "",
						choice4: ""
					});
		}
	}

	componentDidMount() {
		//gets the questions
	  	fetch('http://localhost:3001/questions/find-all')
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	//traverses the data obtained
			for (var i = 0; i < result.length; i++) {
				//if same, push into new array
	  	 		if(this.state._id === result[i]._id) {
					this.setState({
						question: result[i].question,
						difficulty: result[i].difficulty,
						category: result[i].category,
						type: result[i].type,
						choices: result[i].choices,
						answer: result[i].answer
					});
	  	 		}
	  	 	}
	  	 })
	  	  .catch((e) => { console.log(e); });

	  	fetch('http://localhost:3001/categories/find-all')
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	this.setState({ catChoice: result });
	  	 })
	  	  .catch((e) => { console.log(e); });
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit} className="body">
			<div className="header">
			<h1> Edit Question </h1>
			<button className="submit-add" onClick={this.handleSubmit}> Edit Question </button>
			</div>
			<hr/>
		{/*Category*/}
			<h4> Category </h4>
			<select className="dropdown" onChange={this.handleCategory}>
				<option value="">  </option>
				{/*conditional because walang  pang value so undefined*/}
				{this.state.catChoice.map((item, i) => {
						return(
							<option key={i} value={item.name}>{item.name}</option>
							);
					})
				}
			</select>
			<br/>
			{this.state.errorCategory? <div className="error">{this.state.errorCategory}</div>: null}
			<br/> <br/>
		{/*Difficulty**/}
			<h4> Difficulty </h4>
			<select className="dropdown" onChange={this.handleDifficulty}>
				<option value="" > </option>
				{/*conditional because walang  pang value so undefined*/}
				{this.state.difficultyChoice.map(
					(item, i) => {
						return(
							<option key={i} value={item}>{item}</option>
							);
					})
				}
			</select>
			<br/>
			{this.state.errorCategory? <div className="error">{this.state.errorCategory}</div>: null}
			<br/><br/>
		{/*Question Field*/}
			<h4> Question </h4>
			<textarea className="input-question"  
					name="Question"
					placeholder="Question"
					value={this.state.question}
					onChange={this.handleQuestion}/>
			<br/>
			{this.state.errorQuestion? <div className="error">{this.state.errorQuestion}</div>: null}
			<br/><br/>
		{/*Type*/}
			<h4> Type of Question </h4>
			<select className="dropdown" onChange={this.handleType}>
				<option value="" > </option>
				{this.state.typeChoice.map(
					(item, i) => {
						return(
							<option key={i} value={item}>{item}</option>
							);
					})
				}
			</select>
			<br/>
			{this.state.errorType? <div className="error">{this.state.errorType}</div>: null}
			<br/><br/>
			{(this.state.type === "Multiple Choice")?  
			<div>
				<input className="input" 
					type="text" 
					name="Answer"
					placeholder="Choice 1"
					value={this.state.choice1}
					onChange={this.handleChoice1}/>
				{this.state.errorC1? <div className="error">{this.state.errorC1}</div>: null}<br/>
				<input className="input" 
					type="text" 
					name="Answer"
					placeholder="Choice 2"
					value={this.state.choice2}
					onChange={this.handleChoice2}/>
				{this.state.errorC2? <div className="error">{this.state.errorC2}</div>: null}<br/>
				<input className="input" 
					type="text" 
					name="Answer"
					placeholder="Choice 3"
					value={this.state.choice3}
					onChange={this.handleChoice3}/>
				{this.state.errorC3? <div className="error">{this.state.errorC3}</div>: null}<br/>
				<input className="input" 
					type="text" 
					name="Answer"
					placeholder="Choice 4"
					value={this.state.choice4}
					onChange={this.handleChoice4}/>
				{this.state.errorC4? <div className="error">{this.state.errorC4}</div>: null}<br/>
			</div>
			:null}
		{/*Answer*/}
			<h4> Answer </h4>
			<input className="input" 
					type="text" 
					name="Answer"
					placeholder="Answer"
					value={this.state.answer}
					onChange={this.handleAnswer}/>
			<br/>
			{this.state.errorAnswer? <div className="error">{this.state.errorAnswer}</div>: null}
			<br/> <br/>
			</form>
		);
	}

}

export default EditQuestion;