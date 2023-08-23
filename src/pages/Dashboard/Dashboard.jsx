import React, { useEffect, useState } from 'react';
import { Transaction } from 'src/components/Transaction/Transaction';
import { useTranslation } from 'react-i18next';
import localDB from 'src/localStorage/main';
import Wallet from 'src/components/Dashboard/Wallet/Wallet';
import "./dashboard.scss";

export const Dashboard = () => {
  const { t } = useTranslation();
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    setTransaction(localDB.getTransactions())
  }, [])

  return (
    <div className='dashboard'>
      <h2>{t('dashboard.hello')}, Diego 👋</h2>

      <Wallet />
      <section className='dashboard__transaction'>
        <div className='dashboard__transaction__header'>
          <h2>{t('dashboard.recent_transactions')}</h2>
        </div>
        <ul className='dashboard__transaction__list'>
          { 
            transactions.map(item => {
              return (
                <Transaction key={item.id} transaction={item} />
              )
            }) 
          }
        </ul>
      </section>
    </div>
  )
}
