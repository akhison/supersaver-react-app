import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from '../src/components/Home/Home';
import MyBank from '../src/components/MyBank/MyBank';
import AccountAccess from '../src/components/AccountAccess/AccountAccess';
import GlobalContextProvider from './context/GlobalState';
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute';

var isLoggedIn = localStorage.getItem('pass_code') === null ? false : true;

function App() {
  return (
    <GlobalContextProvider>
      <Router>  
          <Switch>        
            <PrivateRoute isLoggedIn={isLoggedIn} path="/" exact component={Home}/>
            <Route path="/access-account" exact component={AccountAccess}/>
            <PrivateRoute isLoggedIn={isLoggedIn} path="/cash-out" exact component={MyBank} />
            
          </Switch> 
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
