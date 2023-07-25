import React from "react";
import Visa from 'src/assets/visa.png';
import MasterCard from 'src/assets/mastercard.png';
import AmericanExpress from 'src/assets/americanexpress.png';
import './creditCard.scss';

const IMAGE_SRC = {
  "VISA": Visa,
  "MASTERCARD": MasterCard,
  "AMERICANEXPRESS": AmericanExpress
}

export const CreditCard = ({card}) => {
  return (
    <div className={card.color + " credit-card animate__animated animate__fadeIn"} key={card.id}>
      <h3>
        {card.description} <small>{card.type}</small>
      </h3>
      <div className="credit-card__balance-image">
        <div>
          <span>Balance</span>
          <h2>$ {card.balance}</h2>
        </div>
        <img src={IMAGE_SRC[card.entity]} alt={card.entity}></img>
      </div>

      <div className="credit-card__actions">
        <span className="material-symbols-outlined" onClick={() => removeCard(card.id)}>
          delete
        </span>
      </div>
    </div>
  );
};
