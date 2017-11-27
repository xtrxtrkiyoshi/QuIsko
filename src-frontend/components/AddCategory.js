import React, { Component } from 'react';

class AddCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",		//name holder
			error: "",		//error holder
			success: "",
			checker: []		//holder for all categories for checking
		}

		this.handlename = this.handlename.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handlename(e) {
		this.setState({ name: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault(); //avoids refreshing

		
		this.setState({ error: "", 
			success: ""}); //reset all states
		if(this.state.name === "") {	//no name will cause error
			this.setState({ error: "Category Name is Required" });
		} else {
			//check if category exists
			for(var i = 0; i < this.state.checker.length; i++) {
				if(this.state.name === this.state.checker[i].name) {
					this.setState({ error: "Category Name Exists"});
					console.log(this.state.error);
					break;
				}
			}
			//there is no error: title exists and no duplicate
			if(this.state.error === "") {
				//push to checker
			  	var temp = this.state.checker.slice();
			  	temp.push({ name: this.state.name });
			  	this.setState({ checker: temp });
			  	console.log("pushed");
			  	
				//add category to database
				fetch('http://localhost:3001/categories/add', { 
				//add second param with method POST to post, and header because theres a body
				//stringiy because only accepts strings
					method: 'POST',
					body: JSON.stringify({
						name: this.state.name
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
		}
		this.setState({ name: "" });
	}

	componentDidMount() {
     	fetch('http://localhost:3001/categories/find-all')
        .then((response) => { return response.json() })
        .then((result) => {
         this.setState({checker: result});
        })
         .catch((e) => { console.log(e); });
    }

	render() {
		return(
			<form className="body add" onSubmit={this.handleSubmit}>
			<div className="header">
			<h1> Add Category </h1>
			<button className="submit-add" onClick={this.handleSubmit}> Add Category </button>
			</div>
			<hr/>
			<br/>
			<h3>Category Name:</h3> 
			<input className="input" 
				type="text"
				name="name"
				placeholder="Category"
				value={this.state.name}
				onChange={this.handlename}/>
				<br/> <br/>
			{/*error message shows up if there is an error*/}
			{this.state.error?<div className="error">{this.state.error}</div>:null}
			{this.state.success?<div className="success">{this.state.success}</div>:null}
			</form>
		);
	}
}

export default AddCategory;