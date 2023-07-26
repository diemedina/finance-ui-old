import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/hooks/useModal';
import { Transaction } from 'src/components/Transaction/Transaction';
import moment from 'moment';
import MockTransaction from 'src/mocks/transactions';
import MockCategories from 'src/mocks/categories';
import Modal from 'src/components/Modal/Modal';
import './transactions.scss';

export default function Transactions() {
  const { t } = useTranslation();
  const [transactions, setTransaction] = useState(MockTransaction);

  const [isOpenDetail, openModalDetail, closeModalDetail] = useModal();
  const [transactionDetail, setTransactionDetail] = useState();

  function viewDetail(transaction) {
    setTransactionDetail(transaction);
    openModalDetail();
  }

  return (
    <>
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

      { isOpenDetail && 
      <Modal title='Detail transaction' closeModal={() => closeModalDetail()}>
        <div key={transactionDetail.id} className='dashboard__transaction__list__item animate__animated animate__fadeIn'>
          <div className={MockCategories[transactionDetail.type].class + ' icon'}>{MockCategories[transactionDetail.type].icon}</div>
          <div className='dashboard__transaction__list__item__detail'>
            <strong>{transactionDetail.description}</strong>
            <small>{MockCategories[transactionDetail.type].title}</small>
          </div>
          <div className='dashboard__transaction__list__item__price'>
            <strong>- $ {transactionDetail.total}</strong>
            <small>{moment(transactionDetail.date).format('ddd D, MMM - HH:mm')}</small>
          </div>
        </div>
      </Modal>
      }

    </>
  )
}
