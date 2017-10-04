import React, { Component } from 'react';

import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

import authRequired from '../components/Authentication';
import AuthContainer from './Auth';
import MessageContainer from './Messages';


class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <Route path='/' exact component={AuthContainer} />
            <Route path='/messages/' exact component={authRequired(MessageContainer)} />
          </div>
      </Router>
    );
  }
}


export default App;
