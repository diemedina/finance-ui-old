import React, { useState } from 'react';
import moment from 'moment';
import Modal from '../../Modal/Modal';
import MockTransaction from '../../../mocks/transactions';
import MockCategories from '../../../mocks/categories';
import { useNotificationsStore } from '../../../store/NotificationsStore';
import { useModal } from '../../../hooks/useModal';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import './transactions.scss';

export default function Transaction() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const {addNotification} = useNotificationsStore();
  const [transactions, setTransaction] = useState(MockTransaction);
  const {isOpen, openModal, closeModal} = useModal();

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

  return (
    <>
      <section className='dashboard__transaction'>
        <div className='dashboard__transaction__header'>
          <h2>Recent Transactions</h2>
          <button onClick={openModal}>
            <i className="material-symbols-outlined">add</i>            
          </button>
        </div>
        <ul className='dashboard__transaction__list'>
          { 
            transactions.map(transaction => {
              return (
                <li key={transaction.id} className='dashboard__transaction__list__item animate__animated animate__fadeIn'>
                  <div className={MockCategories[transaction.type].class + ' icon'}>{MockCategories[transaction.type].icon}</div>
                  <div className='dashboard__transaction__list__item__detail'>
                    <strong>{transaction.description}</strong>
                    <small>{MockCategories[transaction.type]?.title}</small>
                  </div>
                  <div className='dashboard__transaction__list__item__price'>
                    <strong>$ {transaction.total}</strong>
                    <small>{moment(transaction.date).format('HH:mm')}</small>
                  </div>
                </li>
              )
            }) 
          }
        </ul>
      </section>

      { isOpen && 
      <Modal title='Add transaction' closeModal={closeModal}>
        <form className='modal__transaction__add' onSubmit={handleSubmit(addTransaction)}>
          <label htmlFor="type">Type</label>
          <ul className='modal__transaction__list-type'>
            {
              Object.keys(MockCategories).map(category => {
                return (
                  <li className={modelType == category ? 'active' : ''} onClick={() => setModelType(category)}>
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
    </>
  )
}
