import React from "react";
import logo from './Img/logo.png'

import './Header.css';

const Header = ({color}) => {
   return (
        <div className="header-wrapper">
            <img src={logo} style={{width: 50}} alt="logo" />
        </div>
   )
}


export default Header;