import React, { useEffect, useState } from 'react';
import { CreditCard } from '../../CreditCard/CreditCard';
import { useTranslation } from 'react-i18next';
import localDB from 'src/localStorage/main';
import './wallet.scss';

export default function Wallet() {
  const [wallet, setWallet] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setWallet(localDB.getWallet())
  }, []);

  return (
    <section className='dashboard__wallet'>
      <div className="dashboard__wallet__header">
        <h2>{t('dashboard.my_wallet')}</h2>
      </div>
      <div className='dashboard__wallet__list'>
        {
          wallet.map(card => {
            return (
              <CreditCard card={card} key={card.id}/>
            )
          })
        }
      </div>
    </section>
  )
}
