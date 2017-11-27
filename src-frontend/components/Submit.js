import React, { Component } from 'react';
import { withRouter } from 'react-router';
class Submit extends Component {
	constructor(props) {		super(props);

		this.state = {
		score: this.props.match.params.score,
		selected: [this.props.match.params.category1, this.props.match.params.category2, this.props.match.params.category3],
		user: "",
		text: ""
		}
	}

	onChange(e){
	 	this.setState({user: e.target.value})
	}

	handleSubmit(e){
		e.preventDefault();

		fetch('http://localhost:3001/highscores/add', {
			method: 'POST',
			body: JSON.stringify({
				name: this.state.user,
				score: this.state.score,
				categories: this.state.selected
			}),
			headers: {'Content-Type': 'application/json'},
			credentials: 'same-origin'
		})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			this.setState({user:"", text:"Successfully added!"}); 
			this.props.history.push('/scores');
		})
		.catch((e) => { console.log(e); 
		});
	}

	render() {
		return (
			<div className="body">
				<div className="header"> <h1> Submit </h1> </div>
				<div className="question">
					Your score: {this.state.score} <br/>
					Selected Categories: {this.state.selected[0]}, {this.state.selected[1]}, {this.state.selected[2]} <br/> <br/>
					<input type="text" placeholder="Enter your name" onChange={this.onChange.bind(this)}/>
					<br/><a href={`/`}> <button className="submit-quiz" onClick = {this.handleSubmit.bind(this)}> Save score </button> </a>
					{this.state.text}
				</div>
				<div>
					<a href={`/`}> <button className="cat-button"> Go to home </button> </a>
				</div>
			</div>
		);
	}
}

export default withRouter(Submit);