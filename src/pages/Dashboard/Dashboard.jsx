import React from 'react';
import Transactions from '../../components/Dashboard/Transactions/Transactions';
import Wallet from '../../components/Dashboard/Wallet/Wallet';
import "./dashboard.css";

export default function Dashboard() {


  return (
    <div className='dashboard'>
      <h1>Hello, Diego</h1>
      <Wallet />
      <Transactions />
    </div>
  )
}
