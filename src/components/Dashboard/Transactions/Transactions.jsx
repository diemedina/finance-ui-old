import React, { useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import moment from 'moment';
import Modal from 'src/components/Modal/Modal';
import MockTransaction from 'src/mocks/transactions';
import MockCategories from 'src/mocks/categories';
import './transactions.scss';

export default function Transaction() {
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
          <h2>Recent Transactions</h2>
        </div>
        <ul className='dashboard__transaction__list'>
          { 
            transactions.map(transaction => {
              return (
                <li key={transaction.id} className='dashboard__transaction__list__item animate__animated animate__fadeIn' onClick={() => viewDetail(transaction)}>
                  <div className={MockCategories[transaction.type].class + ' icon'}>{MockCategories[transaction.type].icon}</div>
                  <div className='dashboard__transaction__list__item__detail'>
                    <strong>{transaction.description}</strong>
                    <small>{MockCategories[transaction.type].title}</small>
                  </div>
                  <div className='dashboard__transaction__list__item__price'>
                    <strong>- $ {transaction.total}</strong>
                    <small>{moment(transaction.date).format('ddd D, MMM - HH:mm')}</small>
                  </div>
                </li>
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
