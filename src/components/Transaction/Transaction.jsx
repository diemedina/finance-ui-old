import React from 'react';
import moment from 'moment';
import MockCategories from 'src/mocks/categories';
import Modal from 'src/components/Modal/Modal';
import { useModal } from 'src/hooks/useModal';
import './transaction.scss';
import { useNotificationsStore } from 'src/store/NotificationsStore';
import localDB from 'src/localStorage/main';

export const Transaction = ({transaction}) => {
  const [isOpenDetail, openModalDetail, closeModalDetail] = useModal();
  const {addNotification} = useNotificationsStore();

  function viewDetail() {
    openModalDetail();
  }

  function deleteTransaction(id) {
    localDB.removeTransaction(id);
    closeModalDetail();
    addNotification({
      text: 'Remove transaction successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  return (
    <>
      <li className='transaction animate__animated animate__fadeIn' onClick={() => viewDetail(transaction)}>
        <div className={MockCategories[transaction.type].class + ' icon'}>{MockCategories[transaction.type].icon}</div>
        <div className='transaction__detail'>
          <strong>{transaction.description}</strong>
          <small>{MockCategories[transaction.type].title}</small>
        </div>
        <div className='transaction__price'>
          <strong>- $ {transaction.total}</strong>
          <small>{moment(transaction.date).format('ddd D, MMM - HH:mm')}</small>
        </div>
      </li>

      {isOpenDetail && 
        <Modal title='Detail transaction' closeModal={() => closeModalDetail()}>
          <div key={transaction.id} className='transaction animate__animated animate__fadeIn'>
            <div className={MockCategories[transaction.type].class + ' icon'}>{MockCategories[transaction.type].icon}</div>
            <div className='transaction__detail'>
              <strong>{transaction.description}</strong>
              <small>{MockCategories[transaction.type].title}</small>
            </div>
            <div className='transaction__price'>
              <strong>- $ {transaction.total}</strong>
              <small>{moment(transaction.date).format('ddd D, MMM - HH:mm')}</small>
            </div>
          </div>
          <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
        </Modal>
      }
    </>
  )
}
