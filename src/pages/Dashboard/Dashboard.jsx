import React, { useState } from 'react';
import MockTransaction from '../../mocks/transactions';
import moment from 'moment';
import "./dashboard.css";

export default function Dashboard() {
  const [transactions] = useState(MockTransaction);
  console.log(transactions);
  return (
    <div className='dashboard'>
      <h1>Hello, Diego</h1>

      <section className='dashboard__transaction'>
        <h2>Recent Transactions</h2>
        <ul>
          { 
            transactions.map(transaction => {
              return (
                <li key={transaction.id}>
                  <strong>
                    <i className="material-symbols-outlined">{transaction.type}</i>
                    {transaction.description}
                  </strong>
                  <span>{moment(transaction.date).format('LLLL')}</span>
                  <strong>$ {transaction.total}</strong>
                  <i className="material-symbols-outlined">more_vert</i>
                </li>
              )
            }) 
          }
        </ul>
      </section>
    </div>
  )
}
