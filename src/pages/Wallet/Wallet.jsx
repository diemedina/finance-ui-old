import React, { useState } from "react";
import { Navbar } from "src/components/Navbar/Navbar";
import MockWallet from 'src/mocks/wallet';
import { CreditCard } from "src/components/CreditCard/CreditCard";
import "./wallet.scss";

export const Wallet = () => {
  const [wallet] = useState(MockWallet);

  return (
    <div className="wallet">
      <h2>Wallet</h2>
      
      <div className='wallet__list'>
        {
          wallet.map(card => {
            return (
              <CreditCard card={card}/>
            )
          })
        }
      </div>

      <Navbar />
    </div>
  );
};
