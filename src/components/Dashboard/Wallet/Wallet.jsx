import React, { useState } from 'react';
import { useNotificationsStore } from '../../../store/NotificationsStore';
import { useModal } from '../../../hooks/useModal';
import MockWallet from '../../../mocks/wallet';
import { useForm } from 'react-hook-form';
import Modal from '../../Modal/Modal';
import './wallet.scss';

export default function Wallet() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [wallet, setWallet] = useState(MockWallet);
  const {isOpen, openModal, closeModal} = useModal();
  const {addNotification} = useNotificationsStore();
  const [modelColor, setModelColor] = useState('background-1');

  function addCard(data) {
    const _wallet = [...wallet];
    _wallet.unshift({...data, color: modelColor});
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
        <form className='modal__transaction__add' onSubmit={handleSubmit(addCard)}>
          <label>Color</label>
          <ul className='modal__transaction__colors'>
            {
              [1,2,3,4,5,6,7,8].map(n => {
                return (
                  <li className={modelColor == `background-${n}` ? 'active' : ''} onClick={() => setModelColor(`background-${n}`)} key={n}></li>
                )
              })
            }
          </ul>

          <label htmlFor="description">Description</label>
          <input {...register('description', {required: true})} type="text" name="description" id="description" placeholder='Description' />
          
          <label htmlFor="type">Type</label>
          <select {...register('type', {required: true})} name="type" id="type">
            <option value="DEBIT CARD">Debit Card</option>
            <option value="CREDIT CARD">Credit Card</option>
            <option value="PREPAID CARD">Prepaid Card</option>
          </select>

          <label htmlFor="entity">Entity</label>
          <select {...register('entity', {required: true})} name="entity" id="entity">
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
          </select>

          <label htmlFor="balance">Balance</label>
          <input {...register('balance', {required: true})} type="number" name="balance" id="balance" placeholder='$'/>

          <input type="submit" value="Add" />
        </form>
      </Modal>
      }
    </>
  )
}
