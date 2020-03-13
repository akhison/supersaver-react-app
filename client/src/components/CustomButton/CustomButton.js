import React from "react";
import PropTypes from 'prop-types';

import './CustomButton.css';

const CustomButton = ({
      BtnText,
      fontSize,
      width,
      height,
      color,
      background,
      margin,
      onClick,
      btnParams,
      loading
       }) => {
   return (

            <button 
               style={{width,
                height,
                color,
                background,
                margin,
                fontSize
                }}
                className="custom-btn"
                onClick = {!loading ? () =>  onClick(btnParams) : () => {}}
                >
               {loading ? '...loading...' : BtnText}
            </button>
   )
}

CustomButton.defaultProps = {
    BtnText: "ButtonText",
    fontSize: 20,
    width: 200,
    height: 42,
    color: '#fff',
    background: '#333',
    margin: '20px 0',
    btnParams: {},
    loading: false
}

CustomButton.propTypes = {
    BtnTex: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    background: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
  }

export default CustomButton;