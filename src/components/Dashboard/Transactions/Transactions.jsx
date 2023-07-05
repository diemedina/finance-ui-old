import React, { useState } from 'react';
import moment from 'moment';
import Modal from '../../Modal/Modal';
import MockTransaction from '../../../mocks/transactions';
import './transactions.css';

export default function Transaction() {
  const [transactions, setTransaction] = useState(MockTransaction);
  const [isOpen, setIsOpen] = useState(false);

  function addTransaction(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    const _transaction = [...transactions];
    _transaction.unshift({...formJson, date: new Date()});
    setIsOpen(false);
    setTransaction(_transaction);
  }

  return (
    <>
      <section className='dashboard__transaction'>
        <div className='dashboard__transaction__header'>
          <h2>Recent Transactions</h2>
          <button onClick={() => {setIsOpen(true)}}>
            <i className="material-symbols-outlined">add</i>            
          </button>
        </div>
        <ul className='dashboard__transaction__list'>
          { 
            transactions.map(transaction => {
              return (
                <li key={transaction.id} className='dashboard__transaction__list__item'>
                  <i className="material-symbols-outlined">{transaction.type}</i>
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
      <Modal title='Add transaction' setIsOpen={setIsOpen}>
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
