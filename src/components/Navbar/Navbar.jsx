import React, { useState } from 'react'
import { Link, useLocation } from "wouter"
import './navbar.scss'

export const Navbar = () => {
  const [location] = useLocation();
  const [active] = useState(location);

  return (
    <nav className="navbar">
      <Link href="/dashboard">
        <button className={active == '/dashboard' ? 'active' : ''}>
            <span className="material-symbols-outlined">home</span>
        </button>
      </Link>
      <button className={active == 'WALLET' ? 'active' : ''}>
        <span className="material-symbols-outlined">wallet</span>
      </button>

      <button className='navbar__add'>
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
  )
}
