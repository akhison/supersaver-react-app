import React, { Component } from "react";
import Header from '../Header/Header';
import CustomButton from '../CustomButton/CustomButton';
import SavingsList from '../SavingsList/SavingsList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AiTwotoneUnlock } from 'react-icons/ai';
import {GlobalContext} from '../../context/GlobalState';
import {formatAmount, logOut }from '../../tools';
import Alert from '@material-ui/lab/Alert';


import './Home.css';

class Home extends Component {
    static contextType = GlobalContext
     
    state = {
      showError: false
    }

   validatedEntry = (btnParams) => {
      const {amount, accessAndUpdateAccount} = this.context;
      if(amount >= 1  && amount <= 1000){
         accessAndUpdateAccount(btnParams);
      }else {
        this.setState({showError: true})
        this.setAlertTimeOut = setTimeout(() => {
         this.setState({showError: false})
       }, 5000);
      }
   }

   enterBank = () => {
     window.location.href = '/cash-out'
   }

    render(){
      const pass_code = localStorage.getItem('pass_code');
      const {
        gettingData, 
        totalSaved,
        accessAndUpdateAccount, 
        amount,
        handleChange, 
        isLoading, 
        isError, 
        message,
        } = this.context;
     return (
         <React.Fragment>
             {this.state.showError && <Alert severity="error" className="top-bar-error">
                  {"You can save between $1 and $1000 dollars at a time. kindly increase your savings."}
            </Alert>}
            <Header />
            <div className="main-container">
                <div style={{textAlign:'right', padding: "5px 20px 0 0"}}>
                  <AiTwotoneUnlock style={{cursor:'pointer'}} onClick={logOut} />
                </div>
                {gettingData ?
                 <CircularProgress color='#333' className="page-loading" />
                 :
                <div>
                <div className="amount-wrapper">
                    <div className="input-wrap">
                      <span style={{fontSize: 20}}>$</span>
                       <input type="number" name="amount" placeholder="0.00" value={amount} onChange={handleChange}/>
                    </div>
                    <CustomButton 
                      BtnText="Save"
                      fontSize={15}
                      onClick={this.validatedEntry}
                      btnParams={{url: 'add-savings', pass_code, amount}}
                      loading={isLoading}
                    />
                </div>
                
                <SavingsList />

                <div className="savings-access-wrapper">
                    <p style={{fontSize: 12}}>Savings</p>
                <p>{formatAmount(totalSaved)}</p>
                    <div className="access-bank-btn-wrap">
                       <CustomButton 
                         BtnText="Cash out"
                         width={130}
                         background="#f37e95"
                         onClick={this.enterBank}
                       />
                    </div>
                </div>
                </div>
                }
            </div>
         </React.Fragment>
     )
   }
}

export default Home;