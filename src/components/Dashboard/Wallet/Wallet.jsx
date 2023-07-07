import React, { useState } from 'react';
import MockWallet from '../../../mocks/wallet';
import Modal from '../../Modal/Modal';
import './wallet.css';

export default function Wallet() {
  const [wallet, setWallet] = useState(MockWallet);
  const [isOpen, setIsOpen] = useState(false);

  function addCard(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    const _wallet = [...wallet];
    _wallet.unshift({...formJson, balance: 0});
    setIsOpen(false);
    setWallet(_wallet);
  }

  return (
    <>
      <section className='dashboard__wallet'>
        <div className="dashboard__wallet__header">
          <h2>My Wallet</h2>
          <button onClick={() => {setIsOpen(true)}}>
            <i className="material-symbols-outlined">add</i>            
          </button>
        </div>
        <div className='dashboard__wallet__list'>
          {
            wallet.map(card => {
              return (
                <div className="dashboard__wallet__list__item" key={card.id}>
                  <h3>{card.description} <small>{card.type}</small></h3>
                  <div>
                    <span>Balance</span>
                    <h2>$ {card.balance}</h2>
                  </div>
                  <h3>{card.entity}</h3>
                </div>
              )
            })
          }
        </div>
      </section>

      { isOpen && 
      <Modal title='Add card' setIsOpen={setIsOpen}>
        <form className='modal__transaction__add' onSubmit={addCard}>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" placeholder='Description' />
          
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="DEBIT CARD">Debit Card</option>
            <option value="CREDIT CARD">Credit Card</option>
            <option value="PREPAID CARD">Prepaid Card</option>
          </select>

          <label htmlFor="entity">Entity</label>
          <select name="entity" id="entity">
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
          </select>

          <input type="submit" value="Add" />
        </form>
      </Modal>
      }
    </>
  )
}
