import React from 'react';
import Transactions from '../../components/Dashboard/Transactions/Transactions';
import Wallet from '../../components/Dashboard/Wallet/Wallet';
import "./dashboard.scss";

export default function Dashboard() {


  return (
    <div className='dashboard'>
      <h2>Hello, Diego 👋</h2>
      <Wallet />
      <Transactions />
    </div>
  )
}
