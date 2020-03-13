import React, { Component } from "react";
import Header from '../Header/Header';
import { AiTwotoneUnlock, AiTwotoneLock } from 'react-icons/ai';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomButton from '../CustomButton/CustomButton';
import {GlobalContext} from '../../context/GlobalState';

import './AccountAccess.css';

class AccountAccess extends Component {
  static contextType = GlobalContext
         state = {
           showError: false
         }

  
  validatedEntry = (btnParams) => {
     const {pass_code, accessAndUpdateAccount} = this.context;
     if(pass_code.length >= 7){
        accessAndUpdateAccount(btnParams);
     }else {
        this.setState({showError: true})
        this.setAlertTimeOut = setTimeout(() => {
        this.setState({showError: false})
      }, 5000);
     }
  }

  enterBank = () => {
    window.location.href = '/'
  }

   render(){
    const passcodeGenerated = localStorage.getItem("pass_code") !== null ? true : false
     const {
            pass_code,
            amount, 
            accessAndUpdateAccount, 
            createNewAccount, 
            handleChange, 
            isLoading, 
            isError, 
            message,
            gettingData
          } = this.context;

          const savedCode = localStorage.getItem("pass_code");

     return (
         <React.Fragment>
              {this.state.showError && <Alert severity="error" className="top-bar-error">
                  {"kindly type in your pass code. your passcode should be 7 character and case sensitive."}
            </Alert>}
            <Header />
            <div className="main-container">
                <div style={{textAlign:'right', padding: "5px 20px 0 0"}}>
                    <AiTwotoneLock style={{}} />
                </div>
                {gettingData ?
                 <CircularProgress color='#333' className="page-loading" />
                 :
                <div>
                {!passcodeGenerated ? 
                  <div className="access-content-wrapper">
                      <div className="access-input-wrap">
                        <input onChange={handleChange} name="pass_code" value={pass_code} placeholder="Pass code" type="text" maxLength={7} />
                      </div>
                      <CustomButton 
                          BtnText="ENTER"
                          fontSize={15}
                          margin="20px 0 7px 0"
                          onClick={this.validatedEntry}
                          btnParams={{url: 'access-account', pass_code, amount}}
                          loading={isLoading}
                      />
                      <p style={{fontSize: 13, margin:0}}>
                        No passcode? 
                        <span onClick={() => createNewAccount({url: 'access-account', pass_code, amount})} 
                           style={{fontWeight:600, cursor: 'pointer'}}> {isLoading ? 'GENERATING PASS CODE....' : 'Create new account'}</span>
                      </p>
                  </div>
                  :  
                  <div className="access-content-wrapper" style={{marginTop: "10vh"}}>
                        <Alert severity="success" 
                           style={{width:'80%', fontSize: 12, background: '#74cb85', color:'#fff', fontWeight:500}}>
                           You have succesfully created a new account. Your passcode is 
                           <span style={{fontSize: 20, fontWeight: 600, color: '#333'}}>{savedCode}</span>
                           Is important you write it down.
                        </Alert>
                        <div className="access-input-wrap">
                          <input value={savedCode} readOnly />
                        </div>
                        <CustomButton 
                            BtnText="ACCESS ACCOUNT"
                            fontSize={15}
                            margin="20px 0 7px 0"
                            loading={isLoading}
                            btnParams={{url: 'create-account', pass_code}}
                            onClick={this.enterBank}
                        />
                        <p style={{fontSize: 13, margin:0}}>
                          <span style={{fontWeight:600, cursor: 'pointer'}}>{"<<<"}</span>
                        </p>
                   </div>
                }
                 </div>
                 }
            </div>
         </React.Fragment>
     )
   }
}

export default AccountAccess;