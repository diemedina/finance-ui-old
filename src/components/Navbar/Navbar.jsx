import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "wouter"
import { useModalStore } from 'src/store/ModalStore';
import { ModalAddTransaction } from 'src/components/Modal/AddTransaction/AddTransaction';
import './navbar.scss'

export const Navbar = () => {
  const [location] = useLocation();
  const [active, setActive] = useState(location);
  const {setModalActive} = useModalStore();

  useEffect(() => {
    setActive(location)
  }, [location])
  
  return (
    <>
      {
        location != '/' && 
        <nav className="navbar">
          <Link href="/dashboard">
            <button className={active == '/dashboard' ? 'active' : ''}>
                <span className="material-symbols-outlined">home</span>
            </button>
          </Link>
          <Link href="/wallet">
            <button className={active == '/wallet' ? 'active' : ''}>
              <span className="material-symbols-outlined">wallet</span>
            </button>
          </Link>
  
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
      }
      <ModalAddTransaction />
    </>
  )
}
