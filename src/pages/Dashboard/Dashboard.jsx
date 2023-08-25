import React, { useEffect, useState } from 'react';
import { Transaction } from 'src/components/Transaction/Transaction';
import { useTranslation } from 'react-i18next';
import localDB from 'src/localStorage/main';
import { CreditCard } from 'src/components/CreditCard/CreditCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "./dashboard.scss";
import 'swiper/css';
import 'swiper/css/pagination';

export const Dashboard = () => {
  const { t } = useTranslation();
  const [wallet, setWallet] = useState([]);
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    setTransaction(localDB.getTransactions())
    setWallet(localDB.getWallet())
  }, [])

  return (
    <div className='dashboard'>
      <h2>{t('dashboard.hello')}, Diego 👋</h2>

      <section className='dashboard__wallet'>
        <div className="dashboard__wallet__header">
          <h2>{t('dashboard.my_wallet')}</h2>
        </div>
        <div className='dashboard__wallet__list'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            pagination={{clickable: true}}
            modules={[Pagination]}
            className="mySwiper"
          >
            {
              wallet.map(card => {
                return (
                  <SwiperSlide key={card.id}>
                    <CreditCard card={card} key={card.id}/>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </section>
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
