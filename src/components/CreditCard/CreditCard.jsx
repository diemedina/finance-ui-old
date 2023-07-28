import React from "react";
import Visa from 'src/assets/visa.png';
import MasterCard from 'src/assets/mastercard.png';
import AmericanExpress from 'src/assets/americanexpress.png';
import { useTranslation } from 'react-i18next';
import './creditCard.scss';

const IMAGE_SRC = {
  "VISA": Visa,
  "MASTERCARD": MasterCard,
  "AMERICANEXPRESS": AmericanExpress
}

export const CreditCard = ({card, size}) => {
  const { t } = useTranslation();

  return (
    <div className={card.color + " " + size + " credit-card"} key={card.id}>
      <h3>
        {card.description} <small>{card.type}</small>
      </h3>
      <div className="credit-card__balance-image">
        <div>
          <span>{t("credit_card.balance")}</span>
          <h2>$ {card.balance}</h2>
        </div>
        <img src={IMAGE_SRC[card.entity]} alt={card.entity}></img>
      </div>
    </div>
  );
};
