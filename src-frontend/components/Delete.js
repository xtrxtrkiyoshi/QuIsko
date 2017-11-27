import React, { Component } from 'react';

class Delete extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props._id,
			call: this.props.call,
			temp: "",
			questions: []
		}

		this.handleDelete = this.handleDelete.bind(this);

	}

	handleDelete() {
		if(this.state.call === "Category") {
			//get name of category
			fetch('http://localhost:3001/categories/find-all')
			  	 .then((response) => { return response.json() })
			  	 .then((result) => {
			  	 	for (var i = 0; i < result.length; i++) {
						//if same, push into new array
			  	 		if(this.state._id === result[i]._id) {
							this.setState({ temp: result[i].name });
			  	 		}
			  	 	}
			  	 	//delete category
			  	 	return fetch('http://localhost:3001/categories/delete', {
						method: 'POST',
						body: JSON.stringify({
							//pass _id only because yun lang hinihingi ng back end
							_id: this.state._id
						}),
						//because theres a body dapat may header
						headers: { 'Content-Type': 'application/json' },
						credentials: 'same-origin'
					})
			  	 })
			  	 .then((response) => {
	  	 			return response.json() 
  	 			 })
			  	 .then((result) => {
			  	 	console.log("Successfully deleted!");
			  	 })
			  	 .catch((e) => { console.log(e); });

		  	//get all questions  with same category
			fetch('http://localhost:3001/questions/find-all')
		  	 .then((response) => { return response.json() })
		  	 .then((result) => {
		  	 	//traverses the data obtained
				for (var i = 0; i < result.length; i++) {
					//if same, push into new array
		  	 		if(this.state.temp === result[i].category) {
						this.setState({ questions: this.state.questions.concat([result[i]._id]) });
		  	 		}
		  	 	}
		  	 	for (var i = 0; i < this.state.questions.length; i++) {
			  	 	fetch('http://localhost:3001/questions/delete', {
						method: 'POST',
						body: JSON.stringify({
							//pass _id only because yun lang hinihingi ng back end
							_id: this.state.questions[i]
						}),
						//because theres a body dapat may header
						headers: { 'Content-Type': 'application/json' },
						credentials: 'same-origin'
					})
				  	 .then((response) => {
				  	 	return response.json() })
				  	 .then((result) => {
				  	 	console.log("Successfully deleted!");
				  	 })
				  	  .catch((e) => { console.log(e); });
		  	 }

		  	 })
		  	  .catch((e) => { console.log(e); });
		  	 //deletes questions
		} else {
			fetch('http://localhost:3001/questions/delete', {
				method: 'POST',
				body: JSON.stringify({
					//pass _id only because yun lang hinihingi ng back end
					_id: this.state._id
				}),
				//because theres a body dapat may header
				headers: { 'Content-Type': 'application/json' },
				credentials: 'same-origin'
			})
		  	 .then((response) => {
		  	 	return response.json() })
		  	 .then((result) => {
		  	 	console.log("Successfully deleted!");
		  	 })
		  	  .catch((e) => { console.log(e); });
		}

	  	 //reloads browser
	  	 window.location.reload();
	}

	render() {
		return(
			<input 
			className="del-button"
			type="submit"
			name="delete"
			value="X"
			onClick={this.handleDelete}/>
			);
	}
}

export default Delete;