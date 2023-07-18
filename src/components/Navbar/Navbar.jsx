import React, { useState } from 'react'
import { Link, useLocation } from "wouter"
import { useModalStore } from 'src/store/ModalStore';
import { AddTransaction } from 'src/Components/Modal/AddTransaction/AddTransaction';
import './navbar.scss'

export const Navbar = () => {
  const [location] = useLocation();
  const [active] = useState(location);
  const {setModalActive} = useModalStore();

  return (
    <>
      <nav className="navbar">
        <Link href="/dashboard">
          <button className={active == '/dashboard' ? 'active' : ''}>
              <span className="material-symbols-outlined">home</span>
          </button>
        </Link>
        <button className={active == 'WALLET' ? 'active' : ''}>
          <span className="material-symbols-outlined">wallet</span>
        </button>

        <button className='navbar__add' onClick={() => setModalActive('ADD_TRANSACTION')}>
          <span className='material-symbols-outlined'>add</span>
        </button>

        <Link href="/monitoring">
          <button className={active == '/monitoring' ? 'active' : ''}>
              <span className="material-symbols-outlined">monitoring</span>
          </button>
        </Link>
        <button className={active == 'SETTINGS' ? 'active' : ''}>
          <span className="material-symbols-outlined">settings</span>
        </button>
      </nav>

      <AddTransaction />
    </>
  )
}
