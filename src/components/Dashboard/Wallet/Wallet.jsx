import React, { useEffect, useState } from 'react';
import { useNotificationsStore } from 'src/store/NotificationsStore';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { useModal } from 'src/hooks/useModal';
import MockWallet from 'src/mocks/wallet';
import Modal from 'src/components/Modal/Modal';
import { CreditCard } from '../../CreditCard/CreditCard';
import { useTranslation } from 'react-i18next';
import './wallet.scss';

export default function Wallet() {
  const { register, handleSubmit, reset } = useForm();
  const [wallet, setWallet] = useState(MockWallet);
  const [isOpen, openModal, closeModal] = useModal();
  const {addNotification} = useNotificationsStore();
  const [modelColor, setModelColor] = useState('background-1');
  const { t } = useTranslation();

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
          <h2>{t('dashboard.my_wallet')}</h2>
          <button onClick={() => openModal()}>
            <i className="material-symbols-outlined">add</i>            
          </button>
        </div>
        <div className='dashboard__wallet__list'>
          {
            wallet.map(card => {
              return (
                <CreditCard card={card} key={card.id}/>
              )
            })
          }
        </div>
      </section>

      { isOpen && 
      <Modal title='Add card' closeModal={() => closeModal()}>
        <form className='modal__transaction__add' onSubmit={handleSubmit(addCard)}>
          <label>{t("modal.credit_card.color")}</label>
          <ul className='modal__transaction__colors'>
            {
              [1,2,3,4,5,6,7,8].map(n => {
                return (
                  <li className={modelColor == `background-${n}` ? 'active' : ''} onClick={() => setModelColor(`background-${n}`)} key={n}></li>
                )
              })
            }
          </ul>

          <label htmlFor="description">{t("modal.credit_card.description")}</label>
          <input {...register('description', {required: true})} type="text" name="description" id="description" placeholder='Description' autoComplete='off' />
          
          <label htmlFor="type">{t("modal.credit_card.type")}</label>
          <select {...register('type', {required: true})} name="type" id="type">
            <option value="DEBIT CARD">{t("modal.credit_card.debit")}</option>
            <option value="CREDIT CARD">{t("modal.credit_card.credit")}</option>
            <option value="PREPAID CARD">{t("modal.credit_card.prepaid")}</option>
          </select>

          <label htmlFor="entity">{t("modal.credit_card.entity")}</label>
          <select {...register('entity', {required: true})} name="entity" id="entity">
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="AMERICANEXPRESS">AMERICAN EXPRESS</option>
          </select>

          <label htmlFor="balance">{t("modal.credit_card.balance")}</label>
          <input {...register('balance', {required: true})} type="number" name="balance" id="balance" placeholder='$' autoComplete='off'/>

          <input type="submit" value={t("modal.credit_card.action")} />
        </form>
      </Modal>
      }
    </>
  )
}
