import React from 'react';
import Transactions from 'src/components/Dashboard/Transactions/Transactions';
import Wallet from 'src/components/Dashboard/Wallet/Wallet';
import { useTranslation } from 'react-i18next';
import "./dashboard.scss";

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div className='dashboard'>
      <h2>{t('dashboard.hello')}, Diego 👋</h2>

      <Wallet />
      <Transactions />
    </div>
  )
}
