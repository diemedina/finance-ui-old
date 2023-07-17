import React from "react";
import "./modal.scss";

export default function Modal({ children, title, closeModal }) {
  return (
    <>
      <div className="modal__overlay animate__animated animate__fadeIn" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h2>{title}</h2>
            <i className="material-symbols-outlined" onClick={closeModal}>
              close
            </i>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
