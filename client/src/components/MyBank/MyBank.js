import React, { Component } from "react";
import { Link} from "react-router-dom";
import Header from '../Header/Header';
import CashOut from '../CashOuts/CashOuts';
import CustomButton from '../CustomButton/CustomButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AiTwotoneUnlock } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import Alert from '@material-ui/lab/Alert';
import {GlobalContext} from '../../context/GlobalState';
import {formatAmount, logOut }from '../../tools';

import './MyBank.css';

class MyBank extends Component {
  static contextType = GlobalContext

    state = {
      showError: false
    }

  validatedEntry = (btnParams) => {
    const {totalSaved, accessAndUpdateAccount} = this.context;
    if(totalSaved >= 100){
       accessAndUpdateAccount(btnParams);
    }else {
       this.setState({showError: true})
       this.setAlertTimeOut = setTimeout(() => {
         this.setState({showError: false})
       }, 5000);
    }
  }


   render(){

      const pass_code = localStorage.getItem('pass_code');

      const {
        gettingData, 
        totalSaved,
        isLoading, 
        isError, 
        message,
        success
        } = this.context;

      return (
         <React.Fragment>
            {this.state.showError && <Alert severity="error" className="top-bar-error">
                  {"you can only Cashout when you have saved upto $100 USD, keep saving and cash back later."}
            </Alert>}
            <Header />
            <div className="main-container" style={{background: '#fff'}}>
                <div className="top-nav-wrapper">
                  <Link to="/">
                      <IoIosArrowBack size={25} style={{cursor:'pointer'}} />
                   </Link>
                   <AiTwotoneUnlock style={{cursor:'pointer'}} onClick={logOut} />
                </div>
                {gettingData ?
                 <CircularProgress color='#333' className="page-loading" />
                 :
                <div>
                <div style={{padding: "20px 50px"}}>
                    {success ? 
                      <Alert severity="success" style={{marginBottom: 40}}>
                          Your cashout of was Successful!. Below is a table with reference to all your previous cash outs.
                      </Alert>
                     :
                      <Alert severity="info" style={{background: 'cornsilk', marginBottom: 40}}>
                        Are you tired of saving? cashing out will close and reset your savings record.
                      </Alert>
                     }
                    <div style={{display: 'flex', flexDirection:'column'}}>
                      <span style={{color: 'white', fontSize: 12, background: '#f37e95', padding: '0 5px', width: 50, textAlign: 'center'}}>saved</span>
                      <span style={{fontSize: 45, fontWeight: 600,}}>
                        {formatAmount(totalSaved)}
                      </span>
                    </div>

                    <CustomButton 
                      BtnText="Cash Out"
                      background="#000"
                      onClick={this.validatedEntry}
                      btnParams={{url: 'cashout', pass_code, amount: totalSaved}}
                      loading={isLoading}
                    />

                </div>

                <CashOut />
                </div>
                }
            </div>
         </React.Fragment>
     )
   }
}

export default MyBank;