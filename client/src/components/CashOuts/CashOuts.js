import React, {Component} from "react";
import {GlobalContext} from '../../context/GlobalState';
import {formatAmount }from '../../tools';
import moment from 'moment';

import './CashOuts.css';


class CashOuts extends Component {
    static contextType = GlobalContext

    render(){
         const {cashOuts} = this.context;
         const renderCashOuts = cashOuts
         .sort((a,b) => {
            let dateA = new Date(a.time_stamp), dateB = new Date(b.time_stamp);
            return dateB - dateA;
         })
         .map(data => {
             return (
                <li key={data._id}>
                    <p style={{flex: 1}}>
                     {formatAmount(data.amount)}
                    </p>
                    <p style={{flex: 1, paddingLeft: 20}}>{moment(data.time_stamp).format('DD MMM YYYY')}</p>
                </li>
             )
         })
        return (
             <div className="cashout-wrapper"> 
                     <ul className="cashout-list">
                        {cashOuts.length == 0 ? 
                          <li>
                            <p style={{flex: 1, fontWeight: 500}}>no previous cashouts</p>
                          </li>
                          :
                          renderCashOuts 
                        }                 
                    </ul>
            </div>
        )
  }
}

  export default CashOuts;