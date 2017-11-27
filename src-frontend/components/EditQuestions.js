import React, { Component } from 'react';
import Delete from './Delete';

import { Link } from 'react-router-dom';


class EditQuestions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: this.props.match.params.name,
			questions: []
		}

		this.handleCategory = this.handleCategory.bind(this);
		this.handleSubmit =  this.handleSubmit.bind(this); 
	}

	handleCategory(e) {
		this.setState({ category: e.target.value });
	}

	handleSubmit(e) {
		fetch('http://localhost:3001/categories/update', { 
				//add second param with method POST to post, and header because theres a body
				//stringiy because only accepts strings
					method: 'POST',
					body: JSON.stringify({
						name: this.state.category
					}),
					headers: { 'Content-Type': 'application/json' },
					credentials: 'same-origin'
		})
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	for (var i = 0; i < this.state.questions.length; i++) {
				//if same, push into new array
	  	 		fetch('http://localhost:3001/questions/update', { 
				//add second param with method POST to post, and header because theres a body
				//stringiy because only accepts strings
					method: 'POST',
					body: JSON.stringify({
						question: this.state.questions[i].question,
						difficulty: this.state.questions[i].difficulty,
						category: this.state.category,
						type: this.state.questions[i].type,
						choices: this.state.questions[i].choices,
						answer: this.state.questions[i].answer,
						found: false
					}),
					headers: { 'Content-Type': 'application/json' },
					credentials: 'same-origin'
				})
			  	 .then((response) => {
			  	 	return response.json() })
			  	 .then((result) => {
			  	 	//notification for success
			  	 	console.log("Successfully added!");
			  	 	this.setState({ success: "Succesfully Added" });
			  	 })
			  	  .catch((e) => { console.log(e); });
	  	 	}
	  	 })
	  	  .catch((e) => { console.log(e); });
	}

	componentDidMount() {
		//gets the questions
	  	fetch('http://localhost:3001/questions/find-all')
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	//traverses the data obtained
			for (var i = 0; i < result.length; i++) {
				//if same, push into new array
	  	 		if(this.state.category === result[i].category) {
					this.setState({ questions: this.state.questions.concat([result[i]]) });
	  	 		}
	  	 	}
	  	 })
	  	  .catch((e) => { console.log(e); });
	}

	render() {
		return(
			<form className="body">
				<div className="header">
				<input className="input-edit" 
					type="text" 
					name="Category"
					placeholder={this.state.category}
					value={this.state.category}
					onChange={this.handleCategory}/>

				<button className="submit-add" onClick={this.handleSubmit}> Edit Category </button>
				</div>
				<br /> <br /> <hr /> <br /><br />
				<div>
				<ol>	
	        	{
	        		this.state.questions.map((q) => {
	        			return(
	        				<li key={q._id}>
	        					<div className="question">
	        						<br/>
	        						{q.question} 
	        						<br/> <br/>
	        						{q.type==="Multiple Choice"?
	        							<div>
	        								<input type="radio" name="tof"/> { q.choices[0] } <br/>
	        								<input type="radio" name="tof"/> { q.choices[1] } <br/>
	        								<input type="radio" name="tof"/> { q.choices[2] } <br/>
	        								<input type="radio" name="tof"/> { q.choices[3] } <br/>
	        							</div>:null}
	        						{q.type==="True or False"?
	        							<div>
	        								<input type="radio" name="tof"/> True <br/>
	        								<input type="radio" name="tof"/> False <br/>
	        							</div>:null}
	        						{q.type==="Text Answer"?
	        							<input type="text" name="tq"/>:null}
	        						{q.type==="Number Answer"?
	        							<input type="number" name="nq"/>:null}

	        						<br/><br/>
	        						<Link to={`/edit-question/${q._id}`}>
	        						<button className="edit-question">Edit</button>
	        						</Link>
	        						<Delete _id={q._id} call="Question"/>
	        					</div>
	        				</li>
	        			)
	        		})
	        	}
        		</ol>
				
        		</div>
			</form>
		);
	}
}

export default EditQuestions;