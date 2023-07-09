import React, { useState } from 'react';
import moment from 'moment';
import Modal from '../../Modal/Modal';
import MockTransaction from '../../../mocks/transactions';
import { useNotificationsStore } from '../../../store/NotificationsStore';
import { useModal } from '../../../hooks/useModal';
import { v4 as uuid } from 'uuid';
import './transactions.scss';

export default function Transaction() {
  const {addNotification} = useNotificationsStore();
  const [transactions, setTransaction] = useState(MockTransaction);
  const {isOpen, openModal, closeModal} = useModal();

  function addTransaction(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    const _transaction = [...transactions];
    _transaction.unshift({...formJson, date: new Date(), id: uuid()});
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
                <li key={transaction.id} className='dashboard__transaction__list__item'>
                  <div className='icon'>🛍️</div>
                  <div className='dashboard__transaction__list__item__detail'>
                    <strong>{transaction.description}</strong>
                    <small>Shop</small>
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
        <form className='modal__transaction__add' onSubmit={addTransaction}>
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="shopping_cart">Shopping</option>
          </select>

          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" placeholder='Description' />

          <label htmlFor="total">Total</label>
          <input type="number" name="total" id="total" placeholder='$' />

          <input type="submit" value="Add" />
        </form>
      </Modal>
      }
    </>
  )
}
