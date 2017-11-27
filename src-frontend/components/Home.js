import React, { Component } from 'react';

class Home extends Component {
	render() {
		return(
			<div className="Home">
				<a href="/start"> <button className="home-button"> Start Quiz </button> </a>
				<br />
				<a href="/scores"> <button className="home-button"> View Scores </button> </a>
				<br />
				<a href="/edit"> <button className="home-button"> Edit Quiz </button> </a>
			</div>
		);
	}
}

export default Home;