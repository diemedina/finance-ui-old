import React, { useEffect, useState } from 'react';
import { useNotificationsStore } from 'src/store/NotificationsStore';
import { useModal } from 'src/hooks/useModal';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import Modal from 'src/components/Modal/Modal';
import MockTransaction from 'src/mocks/transactions';
import MockCategories from 'src/mocks/categories';
import './transactions.scss';

export default function Transaction() {
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const {addNotification} = useNotificationsStore();
  const [transactions, setTransaction] = useState(MockTransaction);
  const [isOpen, openModal, closeModal] = useModal();

  const [isOpenDetail, openModalDetail, closeModalDetail] = useModal();
  const [transactionDetail, setTransactionDetail] = useState();

  const [modelType, setModelType] = useState('FOOD');

  function addTransaction(data) {
    const _transaction = [...transactions];
    _transaction.unshift({...data, type: modelType, date: new Date(), id: uuid()});
    setTransaction(_transaction);
    
    closeModal();
    addNotification({
      text: 'Add transaction successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  function viewDetail(transaction) {
    setTransactionDetail(transaction);
    openModalDetail();
  }

  useEffect(() => {
    setModelType('FOOD');
    reset({ 
      description: "",
      total: ""
    })
  }, [isOpen]);

  return (
    <>
      <section className='dashboard__transaction'>
        <div className='dashboard__transaction__header'>
          <h2>Recent Transactions</h2>
          <button onClick={() => openModal()}>
            <i className="material-symbols-outlined">add</i>            
          </button>
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
                    <small>{moment(transaction.date).format('ddd D HH:mm')}</small>
                  </div>
                </li>
              )
            }) 
          }
        </ul>
      </section>

      { isOpen && 
      <Modal title='Add transaction' closeModal={() => closeModal()}>
        <form className='modal__transaction__add' onSubmit={handleSubmit(addTransaction)}>
          <ul className='modal__transaction__list-type'>
            {
              Object.keys(MockCategories).map(category => {
                return (
                  <li className={modelType == category ? 'active' : ''} onClick={() => setModelType(category)} key={category}>
                    <div className={MockCategories[category].class}>{MockCategories[category].icon}</div>
                  </li>
                )
              })
            }
          </ul>

          <label htmlFor="description">Description</label>
          <input {...register('description', {required: true})} type="text" name="description" id="description" placeholder='Description' />
          {errors.description && <small>* Description required</small>}

          <label htmlFor="total">Total</label>
          <input {...register('total', {required: true})} type="number" name="total" id="total" placeholder='$' />
          {errors.total && <small>* Total required</small>}

          <input type="submit" value="Add" />
        </form>
      </Modal>
      }

      { isOpenDetail && 
      <Modal title='Detail transaction' closeModal={() => closeModalDetail()}>
        <div key={transactionDetail.id} className='dashboard__transaction__list__item animate__animated animate__fadeIn'>
          <div className={MockCategories[transactionDetail.type].class + ' icon'}>{MockCategories[transactionDetail.type].icon}</div>
          <div className='dashboard__transaction__list__item__detail'>
            <strong>{transactionDetail.description}</strong>
            <small>{MockCategories[transactionDetail.type].title}</small>
          </div>
          <div className='dashboard__transaction__list__item__price'>
            <strong>$ {transactionDetail.total}</strong>
            <small>{moment(transactionDetail.date).format('HH:mm')}</small>
          </div>
        </div>
      </Modal>
      }

    </>
  )
}
