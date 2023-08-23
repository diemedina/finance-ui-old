import React, { useEffect, useState } from 'react'
import { useNotificationsStore } from 'src/store/NotificationsStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useModalStore } from 'src/store/ModalStore';
import { Pagination, EffectCards } from 'swiper/modules';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { CreditCard } from "src/components/CreditCard/CreditCard";
import MockCategories from 'src/mocks/categories';
import MockWallet from 'src/mocks/wallet';
import Modal from 'src/components/Modal/Modal';
import './addTransaction.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import localDB from 'src/localStorage/main';

export const ModalAddTransaction = () => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const {addNotification} = useNotificationsStore();
  const {modalActive, setModalActive} = useModalStore();
  const [modelType, setModelType] = useState('FOOD');
  const [typeCost, setTypeCost] = useState('expence');
  const [wallet] = useState(MockWallet);

  function addTransaction(data) {
    const model = {
      ...data,
      type: modelType,
      date: new Date(),
      id: uuid()
    }

    localDB.addTransaction(model);
    setModalActive();
    addNotification({
      text: 'Add transaction successful',
      type: 'success',
      icon: 'check_circle'
    });
  }

  useEffect(() => {
    setModelType('FOOD');
    reset({ 
      description: "",
      total: ""
    })
  }, [modalActive]);


  return (
    <>
      { modalActive == 'ADD_TRANSACTION' && 
        <Modal title='Add transaction' closeModal={() => setModalActive()}>
          <form className='modal__transaction__add' onSubmit={handleSubmit(addTransaction)}>

            <div className='modal__transaction__add__cost-type'>
              <div className={typeCost == 'expence' ? 'expence active' : 'expence'} onClick={() => setTypeCost('expence')}>
                <span className="material-symbols-outlined icon">trending_up</span>
                Expence
              </div>
              <div className={typeCost == 'income' ? 'income active' : 'income'} onClick={() => setTypeCost('income')}>
                <span className="material-symbols-outlined icon">trending_down</span>
                Income
              </div>
            </div>

            <div className='input-total'>
              <span>$</span>
              <input type="number" name="total" id="total" {...register('total', {required: true})}/>
              {errors.total && <small>* Description required</small>}
            </div>

            <label htmlFor="description">Description</label>
            <input {...register('description', {required: true})} type="text" name="description" id="description" placeholder='Description' />
            {errors.description && <small>* Description required</small>}

            <label htmlFor="creditCard">Credit Card</label>
            <div className='modal__transaction__add__credit-card'>
            <Swiper
                slidesPerView={1}
                spaceBetween={8}
                pagination={{clickable: true}}
                modules={[Pagination]}
                className="mySwiper"
              >
                {
                  wallet.map(card => {
                    return (
                      <SwiperSlide key={card.id}>
                        <CreditCard card={card} size="small"/>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>

            <label htmlFor="description">Type</label>
            <div className='modal__transaction__add__list-type'>
              <Swiper
                slidesPerView={5}
                spaceBetween={4}
                pagination={{clickable: true}}
                modules={[Pagination]}
                className="mySwiper"
              >
                {
                  Object.keys(MockCategories).map(category => {
                    return (
                      <SwiperSlide key={category}>
                        <div 
                          onClick={() => setModelType(category)}
                          className={MockCategories[category].class + ' icon ' + (modelType == category ? 'active' : '')}>{MockCategories[category].icon}</div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>

            <input type="submit" value="Add" />
          </form>
        </Modal>
      }
    </>
  )
}
