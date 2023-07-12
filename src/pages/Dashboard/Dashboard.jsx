import React from 'react';
import Transactions from 'src/components/Dashboard/Transactions/Transactions';
import Wallet from 'src/components/Dashboard/Wallet/Wallet';
import Navbar from 'src/components/Navbar/Navbar';
import "./dashboard.scss";

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <h2>Hello, Diego 👋</h2>
      <Wallet />
      <Transactions />
      <Navbar />
    </div>
  )
}
