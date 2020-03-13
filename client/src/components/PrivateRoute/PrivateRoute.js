
import React from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, ...props }) => {
    console.log('store ' , localStorage.getItem('pass_code'))
  return (
     isLoggedIn 
    ? <Route { ...props } />
    : <Redirect to="/access-account" />
  )
}

export default PrivateRoute