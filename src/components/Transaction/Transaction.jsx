import React from 'react';
import moment from 'moment';
import MockCategories from 'src/mocks/categories';
import './transaction.scss';

export const Transaction = ({transaction}) => {
  function viewDetail(transaction) {
    console.log(transaction);
  }

  return (
    <li className='transaction animate__animated animate__fadeIn' onClick={() => viewDetail(transaction)}>
      <div className={MockCategories[transaction.type].class + ' icon'}>{MockCategories[transaction.type].icon}</div>
      <div className='transaction__detail'>
        <strong>{transaction.description}</strong>
        <small>{MockCategories[transaction.type].title}</small>
      </div>
      <div className='transaction__price'>
        <strong>- $ {transaction.total}</strong>
        <small>{moment(transaction.date).format('ddd D, MMM - HH:mm')}</small>
      </div>
    </li>
  )
}
