import React, { Component } from 'react';

class Scores extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scorers: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/highscores/find-all')
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	this.setState({scorers: result});
	  	 })
	  	  .catch((e) => { console.log(e); });
	}


	render() {
		return(
			<div className="body">
				<h1> Scores </h1>
				<hr/>
				<div>
					<div className="inline">
					<h3 className="name">Name</h3>
					<ol> {/*Enumerate names*/}
					{
						this.state.scorers.map((scorer) => {
	        			return(
	                  		<li key={scorer._id}> 
	        				  {scorer.name} <br/><br/>
	        				</li> 
	        			)
	        		})
					}
					</ol>
					</div>

					<div className="inline2">
					<h3 className="score">Score</h3>
					<ol> {/*Enumerate scores*/}
					{
						this.state.scorers.map((scorer) => {
	        			return(
	                  		<li key={scorer._id}> 
	                  			{scorer.score} <br/><br/>
	        				</li>
	        			)
	        		})
					}
					</ol>
					</div>

					<div className="inline3">
					<center><h3>Categories</h3></center>
					<ol>
					{
						this.state.scorers.map((scorer) => {
	        			return(
	                  		<li key={scorer._id}> 
	                  			<dd>{scorer.categories.join(", ")}</dd><br/>
	        				</li> 
	        			)
	        		})
					}
					</ol>
					</div>
				</div>
			</div>
		);
	}
}

export default Scores;