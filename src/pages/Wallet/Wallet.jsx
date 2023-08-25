import React, { useState, useEffect } from "react";
import { useNotificationsStore } from 'src/store/NotificationsStore';
import { useRoute, useLocation } from "wouter";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from "react-i18next";
import { EffectCards } from 'swiper/modules';
import { Transaction } from 'src/components/Transaction/Transaction';
import { CreditCard } from "src/components/CreditCard/CreditCard";
import { v4 as uuid } from 'uuid';
import { useModal } from 'src/hooks/useModal';
import { useForm } from 'react-hook-form';
import localDB from 'src/localStorage/main';
import Modal from 'src/components/Modal/Modal';
import MockTransaction from 'src/mocks/transactions';
import "./wallet.scss";
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export const Wallet = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, openModal, closeModal] = useModal();
  const [wallet, setWallet] = useState([]);
  const [transactions] = useState(MockTransaction);
  const [, params] = useRoute("/wallet/:id");
  const [, setLocation] = useLocation();
  const {addNotification} = useNotificationsStore();
  const [modelColor, setModelColor] = useState('background-1');
  const [initialSlideValue, setInitialSlide] = useState(null);

  useEffect(() => {
    const listWallet = localDB.getWallet()
    setWallet(listWallet)

    if (!params?.id) {
      setLocation(`/wallet/${listWallet[0].id}`);
    } else {
      const index = listWallet.findIndex(wallet => wallet.id == params.id)
      setInitialSlide(index);
      console.log(index)
    }


    setModelColor('background-1');
    reset({ 
      description: "",
      type: "DEBIT CARD",
      entity: "VISA",
      balance: ""
    })
  },[])

  function sliderChange(e) {
    if (params?.id) setLocation(`/wallet/${e.realIndex}`);
    setInitialSlide(e.realIndex);
  }

  function addCard(data) {
    const modelCard = {
      ...data,
      color: modelColor,
      id: uuid()
    }
    console.log(modelCard)
    localDB.addCardInWallet(modelCard)
    setWallet(localDB.getWallet())

    closeModal();
    addNotification({
      text: 'Add card successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  function removeCard() {
    localDB.removeCardInWallet(initialSlideValue);
    setWallet(localDB.getWallet())
    
    addNotification({
      text: 'Remove card successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  return (
    <>
      <div className="wallet">
        <div className="wallet__header">
          <h2>{t("wallet.title")}</h2>
          <button onClick={openModal}>Add</button>
        </div>
        
        <div className="wallet__list">
          { initialSlideValue != null && 
            <Swiper modules={[EffectCards]} effect="cards" initialSlide={initialSlideValue} onSlideChange={sliderChange}>
              {
                wallet.map(card => {
                  return (
                    <SwiperSlide key={card.id}>
                      <CreditCard card={card}/>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          }
        </div>

        <div className="wallet__actions">
          <button onClick={openModal}>
            <span className="material-symbols-outlined">edit</span>
            {t("wallet.edit")}
          </button>
          <button className="remove" onClick={removeCard}>
            <span className="material-symbols-outlined">delete</span>
            {t("wallet.remove")}
          </button>
        </div>

        <div className="wallet__last-transactions">
          <div className="wallet__last-transactions__header">
            <h3>Transactions</h3>
          </div>
          <ul className='wallet__last-transactions__list'>
            { 
              transactions.map(item => {
                return (
                  <Transaction key={item.id} transaction={item} />
                )
              }) 
            }
          </ul>
        </div>
      </div>

      { isOpen && 
        <Modal title='Add card' closeModal={() => closeModal()}>
          <form className='modal__transaction__add' onSubmit={handleSubmit(addCard)}>
            <label>{t("modal.credit_card.color")}</label>
            <div className="modal__transaction__add__colors">
              <Swiper
                slidesPerView={5}
                spaceBetween={4}
                pagination={{clickable: true}}
                modules={[Pagination]}
                className="mySwiper"
              >
                {
                  [1,2,3,4,5,6,7,8].map(n => {
                    return (
                      <SwiperSlide key={n}>
                        <div className={`background-${n} item-color ` + (modelColor == `background-${n}` ? 'active' : '')} onClick={() => setModelColor(`background-${n}`)} key={n}></div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
            
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
  );
};
