import React from 'react';
import "./modal.scss";
import { useModal } from '../../hooks/useModal';

export default function Modal({children, title, closeModal}) {
  return (
        <>
            <div className="modal__overlay">
                <div className="modal">
                    <div className="modal__header">
                        <h1>{title}</h1>
                        <i className="material-symbols-outlined" onClick={closeModal}>close</i>
                    </div>
                    {children}    
                </div>       
            </div>
        </>
    )
}
