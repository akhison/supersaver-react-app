import React, {Component} from "react";
import {GlobalContext} from '../../context/GlobalState';
import moment from 'moment';
import {formatAmount }from '../../tools';

import './SavingsList.css';

class SavingsList extends Component {
    static contextType = GlobalContext

    render(){
         const {savings} = this.context;
         const renderSavingsList = savings
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
                    <p style={{flex: 1, paddingLeft: 10}}>{moment(data.time_stamp).format('DD MMM YYYY')}</p>
                </li>
             )
         })
        return (
                <div className="transactions-wrapper"> 
                    <ul className="transactions-list">
                        {savings.length == 0 ? 
                          <li>
                            <p style={{flex: 1}}>you have no savings yet!</p>
                          </li>
                          :
                          renderSavingsList
                        }                 
                    </ul>
            </div>
        )
  }

}

export default SavingsList;