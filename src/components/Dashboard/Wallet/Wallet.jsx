import React, { useEffect, useState } from 'react';
import { useNotificationsStore } from 'src/store/NotificationsStore';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { useModal } from 'src/hooks/useModal';
import MockWallet from 'src/mocks/wallet';
import Modal from 'src/components/Modal/Modal';
import './wallet.scss';

export default function Wallet() {
  const { register, handleSubmit, reset } = useForm();
  const [wallet, setWallet] = useState(MockWallet);
  const {isOpen, openModal, closeModal} = useModal();
  const {addNotification} = useNotificationsStore();
  const [modelColor, setModelColor] = useState('background-1');

  function addCard(data) {
    const _wallet = [...wallet];
    _wallet.unshift({...data, color: modelColor, id: uuid()});
    setWallet(_wallet);

    closeModal();
    addNotification({
      text: 'Add card successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  function removeCard(id) {
    const _wallet = [...wallet];
    setWallet(_wallet.filter(w => w.id != id));

    addNotification({
      text: 'Remove card successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  useEffect(() => {
    setModelColor('background-1');
    reset({ 
      description: "",
      type: "DEBIT CARD",
      entity: "VISA",
      balance: ""
    })
  }, [isOpen]);

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
                  <img src={`src/assets/${card.entity.toLowerCase()}.png`} alt={card.entity}></img>

                  <div className='dashboard__wallet__list__item__actions'>
                    <span className="material-symbols-outlined" onClick={() => removeCard(card.id)}>delete</span>
                  </div>
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
          <input {...register('description', {required: true})} type="text" name="description" id="description" placeholder='Description' autoComplete='off' />
          
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
            <option value="AMERICANEXPRESS">AMERICAN EXPRESS</option>
          </select>

          <label htmlFor="balance">Balance</label>
          <input {...register('balance', {required: true})} type="number" name="balance" id="balance" placeholder='$' autoComplete='off'/>

          <input type="submit" value="Add" />
        </form>
      </Modal>
      }
    </>
  )
}
