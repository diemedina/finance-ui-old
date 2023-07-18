import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNotificationsStore } from 'src/store/NotificationsStore';
import { useModalStore } from 'src/store/ModalStore';
import Modal from 'src/components/Modal/Modal';
import MockCategories from 'src/mocks/categories';
import { v4 as uuid } from 'uuid';

export const ModalAddTransaction = () => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const {addNotification} = useNotificationsStore();
  const {modalActive, setModalActive} = useModalStore();
  const [modelType, setModelType] = useState('FOOD');

  function addTransaction(data) {
    const model = {
      ...data,
      type: modelType,
      date: new Date(),
      id: uuid()
    }

    console.log(model);

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
            <ul className='modal__transaction__list-type'>
              {
                Object.keys(MockCategories).map(category => {
                  return (
                    <li className={modelType == category ? 'active' : ''} onClick={() => setModelType(category)} key={category}>
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
