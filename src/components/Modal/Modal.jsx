import React from 'react';
import "./modal.css";

export default function Modal({children, title, setIsOpen}) {
  return (
        <>
            <div className="modal__overlay">
                <div className="modal">
                    <div className="modal__header">
                        <h1>{title}</h1>
                        <i className="material-symbols-outlined" onClick={() => {setIsOpen(false)}}>close</i>
                    </div>
                    {children}    
                </div>       
            </div>
        </>
    )
}
