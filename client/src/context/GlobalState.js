import React, {Component, createContext} from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
    state = {
        savings: [],
        cashOuts: [],
        amount: '',
        totalSaved: 0,
        isLoading: false,
        isError: false,
        success: false,
        passcodeGenerated: false,
        message: '',
        pass_code: '',
        gettingData: true,
        isAuth: true,
    }

    componentDidMount(){
        if (localStorage.getItem('pass_code') !== null) {
            this.getData()
        }else {
            this.setState({gettingData: false})
        }
    }

     //UPDATE USER DATA IF AUTH
     getData = async () => {      
        const pass_code = localStorage.getItem('pass_code');  
        try {
         const response = await axios.post('/user/retrieve-data', {pass_code});
         const {data} = response;
         if (data.success) {
            this.setState({
                savings: data.data.savings, 
                cashOuts: data.data.cashouts, 
                totalSaved: this.sumSavingsTotal(data.data.savings),
                gettingData: false, 
            })
         } else {
            this.setState({gettingData: false, message: data.message})
         }
       } catch (error) {
         this.setState({gettingData: false, isError: true, message: "Seems there is a network error, please refresh!"})
       }
     }


    //CREATE A NEW USER ACCOUNT AND GENERATE PASS CODE
    createNewAccount = async () => {
        this.setState({isLoading: true, isError: false})
        try {
         const response = await axios.post('/user/create-account', {});
         const {data} = response;
         if (data.success) {
            localStorage.setItem('pass_code', data.pass_code);
            this.setState({
                isLoading: false, 
                savings: data.data.savings, 
                cashOuts: data.data.cashouts, 
                passcodeGenerated: true,
                pass_code: data.data.pass_code
            })
         } else {
            this.setState({isLoading: false, message: data.message})
         }
       } catch (error) {
         this.setState({isLoading: false, isError: true, message: "An error occured!"})
       }
     }


     //API OPERATIONS WITH CUSTOM PARAMS
    accessAndUpdateAccount = async ({url, pass_code, amount}) => {        
        this.setState({isLoading: true, message: '', isError: false})
            try {
                const response = await axios.post('/user/' + url, {pass_code, amount});
                const {data} = response;
                if (data.success) {
                    let totalSaved = this.sumSavingsTotal(data.data.savings);
                    this.setState({    
                        savings: data.data.savings, 
                        cashOuts: data.data.cashouts,                   
                        totalSaved,
                        isLoading: false, 
                        success: true,
                        amount: ''
                    })
                    if (url === "access-account") {
                        localStorage.setItem('pass_code', data.data.pass_code)
                        window.location.href = '/'
                    }
                } else {
                    this.setState({isLoading: false, message: data.message, isError: true})
                }
            } catch (error) {        
                this.setState({isLoading: false, isError: true, message: "An error occured!"})
            }
     }

    handleChange = (e) => {
       this.setState({[e.target.name]: e.target.value})
    }
    
     //SUM UP THE USER SAVINGS TOTAL
    sumSavingsTotal =  (savings) => {
        let amountTotal = 0;
         savings.forEach(data => {
            amountTotal += data.amount;
         })      
         return amountTotal;
    }

    render(){
        const {children} = this.props;
        return(
            <GlobalContext.Provider 
              value={{
                  ...this.state, 
                  accessAndUpdateAccount: this.accessAndUpdateAccount,
                  createNewAccount: this.createNewAccount,
                  handleChange: this.handleChange
                  }}>
                {children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContextProvider;