import React, { Component } from 'react';
import Delete from './Delete'

class Edit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: []
		}
	}
	
	componentDidMount() {
	  	fetch('http://localhost:3001/categories/find-all')
	  	 .then((response) => { return response.json() })
	  	 .then((result) => {
	  	 	this.setState({categories: result});
	  	 })
	  	  .catch((e) => { console.log(e); });
	}
	
	render() {
		return(
			<div className="edit-body">
			<div className="edit-div">
			<div className="header">
			<h1> Edit </h1>
			</div>
			<hr/>
			<br/>
				<ol>
	        	{
	        		this.state.categories.map((category) => {
	        			return(
	                  <li key={category._id}> 
	        				  <a href={`/edit/${category.name}`}> <button className="cat-button"> {category.name} </button> </a>
	                  <Delete _id={category._id} call="Category"/>
	        				  </li>
	        			)
	        		})
	        	}
	        	</ol>
	        <br/>
	        </div>
	        <div className="edit-div1">
	        <div className="header">
			<h1> Add </h1>
			</div>
	        <hr/>
	        <a href="/add-category"> <button className="edit-button"> Add Category </button> </a>
	        <br/>
	        <a href="/add-question"> <button className="edit-button"> Add Question </button> </a>
			</div>
			</div>
		);
	}


}

export default Edit;