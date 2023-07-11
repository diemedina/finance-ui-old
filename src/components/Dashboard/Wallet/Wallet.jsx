import React, { useState } from 'react';
import { useNotificationsStore } from '../../../store/NotificationsStore';
import { useModal } from '../../../hooks/useModal';
import MockWallet from '../../../mocks/wallet';
import Modal from '../../Modal/Modal';
import './wallet.scss';

export default function Wallet() {
  const [wallet, setWallet] = useState(MockWallet);
  const {isOpen, openModal, closeModal} = useModal();
  const {addNotification} = useNotificationsStore();

  function addCard(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    const _wallet = [...wallet];
    _wallet.unshift({...formJson, balance: 0});
    setWallet(_wallet);

    closeModal();
    addNotification({
      text: 'Add card successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  return (
    <>
      <section className='dashboard__wallet'>
        <div className="dashboard__wallet__header">
          <h2>My Wallet</h2>
          <button onClick={openModal}>
            <i className="material-symbols-outlined">add</i>            
          </button>
        </div>
        <div className='dashboard__wallet__list'>
          {
            wallet.map(card => {
              return (
                <div className={card.color + ' dashboard__wallet__list__item animate__animated animate__fadeIn'} key={card.id}>
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
      <Modal title='Add card' closeModal={closeModal}>
        <form className='modal__transaction__add' onSubmit={addCard}>
          <label>Color</label>
          <ul className='modal__transaction__colors'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

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

          <label htmlFor="balance">Balance</label>
          <input type="number" name="balance" id="balance" placeholder='$'/>

          <input type="submit" value="Add" />
        </form>
      </Modal>
      }
    </>
  )
}
