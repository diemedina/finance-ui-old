import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from "react-i18next";
import { EffectCards } from 'swiper/modules';
import { Transaction } from 'src/components/Transaction/Transaction';
import { CreditCard } from "src/components/CreditCard/CreditCard";
import MockTransaction from 'src/mocks/transactions';
import MockWallet from 'src/mocks/wallet';
import "./wallet.scss";
import 'swiper/css';
import 'swiper/css/effect-cards';

export const Wallet = () => {
  const { t } = useTranslation();
  const [wallet] = useState(MockWallet);
  const [transactions, setTransaction] = useState(MockTransaction);

  return (
    <div className="wallet">
      <h2>{t("wallet.title")}</h2>
      
      <div className="wallet__list">
        <Swiper modules={[EffectCards]} effect="cards">
          {
            wallet.map(card => {
              return (
                <SwiperSlide key={card.id}>
                  <CreditCard card={card}/>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>

      <div className="wallet__actions">
        <button>
          <span className="material-symbols-outlined">edit</span>
          {t("wallet.edit")}
        </button>
        <button className="remove">
          <span className="material-symbols-outlined">delete</span>
          {t("wallet.remove")}
        </button>
      </div>

      <div className="wallet__last-transactions">
        <div className="wallet__last-transactions__header">
          <h3>Transactions</h3>
        </div>
        <ul className='wallet__last-transactions__list'>
          { 
            transactions.map(item => {
              return (
                <Transaction key={item.id} transaction={item} />
              )
            }) 
          }
        </ul>
      </div>
    </div>
  );
};
