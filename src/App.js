import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Area from './Components/Area';
import Admin from './Components/Admin';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import * as firebase from 'firebase';


class App extends Component { 
  render(props) {
    return (
    <Router>
    <div>
    <Route exact path="/" component={SignUp}/>
    <Route  path="/Home" {...props} component={Home}/> 
     <Route path="/Area/:_uid" {...props} component={Area}/>
    <Route path="/Admin" component={Admin}/>    
    </div>
    </Router> 
    );
  }
}

export default App;
