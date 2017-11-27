import React, { Component } from 'react';
import AddCategory from './components/AddCategory';
import AddQuestion from './components/AddQuestion';
import Edit from './components/Edit';
import EditQuestion from './components/EditQuestion';
import EditQuestions from './components/EditQuestions';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Submit from './components/Submit';
import Scores from './components/Scores';
import Start from './components/Start';

import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <center><img src={require('./components/picture/header1.png')} alt="QUISKO"/></center>
        </header>
        <Router>
          <div className="content">
            <Route exact={true} path="/add-category" component={AddCategory}/>
            <Route exact={true} path="/add-question" component={AddQuestion}/>
            <Route exact={true} path="/edit/" component={Edit} />
            <Route exact={true} path="/edit-question/:_id" component={EditQuestion}/>
            <Route exact={true} path="/edit/:name" component={EditQuestions}/>
            <Route exact={true} path="/" component={Home} />
            <Route path="/quiz/:category1/:category2/:category3/:number" component={Quiz} />
            <Route exact={true} path="/submit/:category1/:category2/:category3/:score" component={Submit}/>
            <Route exact={true} path="/scores/" component={Scores} />
            <Route exact={true} path="/start/" component={Start} />
          </div>
        </Router>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
