import React, { Component } from 'react';
import { withRouter } from 'react-router';
class Start extends Component {
	constructor(props) {
		super(props);

		this.state = {
		categories: [],
		selected:[],
		error: "",
		questions: [],
		questionsEasy: [],
		questionsMedium: [],
		questionsHard: [],
		array: [],
		number: 3
		}
	}
	
	componentDidMount() {
	  	fetch('http://localhost:3001/categories/find-all')
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	this.setState({categories: result});
	  	 }).catch((e) => { console.log(e); });
			
		fetch('http://localhost:3001/questions/find-all')
			.then((response) => { return response.json() })
			.then((result) => {
				this.setState({questionArray: result});
			}).catch((e) => { console.log(e); });

	}

	onChangeCheckbox(e) {
	    // current array of options
	    const selected = this.state.selected
	    let index

	    // check if the check box is checked or unchecked
	    if (e.target.checked) {
	      // add the numerical value of the checkbox to options array
	      selected.push(e.target.value)
	    } else {
	      // or remove the value from the unchecked checkbox from the array
	      index = selected.indexOf(e.target.value)
	      selected.splice(index, 1)
	    }

	    // update the state with the new array of options
	    this.setState({ selected: selected })
	  }

	 onChangeNumber(e){
	 	if(e.target.value < 3){
	 		this.setState({number: 3})
	 	}else{
	 		this.setState({number: e.target.value})
	 	}
	 }

	 randomize(){
		if(this.state.selected.length != 3){
			this.setState({error: "Please select at exactly 3 categories"});
			this.props.history.push('/start/');
		}else{	
			this.props.history.push('/quiz/' + this.state.selected[0] +'/'+ this.state.selected[1] + '/' + this.state.selected[2] + '/' + this.state.number);
		}
	 }

	render() {
		return (
			<div className="body">
				<div className="header"> <h1> Start Quiz </h1> </div>
				<div className="question">
					<br/>Choose (3) categories.
			        <ol>	
			        	{
			        		this.state.categories.map((category) => {
			        			return(
			        				<li key={category._id}><input type="checkbox" name="category" value={category.name} onChange={this.onChangeCheckbox.bind(this)}/>{category.name}</li>
			        			);
							})
			        	}
		        	</ol>
					Choose (min 3) questions.	 <br/>
					<input type="number" name="no" min="3" value={this.state.number} onChange={this.onChangeNumber.bind(this)}/>
				{this.state.error}
				</div>
				<div>
					 <button onClick={this.randomize.bind(this)} className="cat-button"> Start quiz </button><br/>
					<a href={`/`}> <button className="cat-button"> Go back </button> </a>
				</div>
			</div>
		);
	}
}
export default withRouter(Start);