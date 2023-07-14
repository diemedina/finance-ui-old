import React, { useState } from 'react'
import { Link } from "wouter"
import './navbar.scss'

export default function Navbar() {
  const [active, setActive] = useState('HOME');

  return (
    <nav className="navbar">
      <button className={active == 'HOME' ? 'active' : ''} onClick={() => setActive('HOME')}>
        <Link href="/dashboard">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </button>
      <button className={active == 'WALLET' ? 'active' : ''} onClick={() => setActive('WALLET')}>
        <span className="material-symbols-outlined">wallet</span>
      </button>
      <button className={active == 'MONITORING' ? 'active' : ''} onClick={() => setActive('MONITORING')}>
        <Link href="/monitoring">
          <span className="material-symbols-outlined">monitoring</span>
        </Link>
      </button>
      <button className={active == 'SETTINGS' ? 'active' : ''} onClick={() => setActive('SETTINGS')}>
        <span className="material-symbols-outlined">settings</span>
      </button>
    </nav>
  )
}
