import React, { Component } from 'react';

import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import authRequired from '../components/Authentication';
import AuthContainer from './Auth';
import MessageContainer from './Messages';


const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
          <div className="App">
            <Route path='/' exact component={AuthContainer} />
            <Route path='/messages/' component={authRequired(MessageContainer)} />
          </div>
      </Router>
    );
  }
}


export default App;
