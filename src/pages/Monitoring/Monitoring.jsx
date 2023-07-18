import React, { useState } from 'react';
import { Navbar } from 'src/components/Navbar/Navbar';
import './monitoring.scss';

const _PERIODS = [
  {
    label: '7 days',
    value: 7
  },
  {
    label: '15 days',
    value: 15
  },
  {
    label: '1 month',
    value: 30
  },
  {
    label: '3 months',
    value: 90
  }
];

export const Monitoring = () => {
  const [period, setPeriod] = useState(7);

  return (
    <div className='monitoring'>
      <h2>Monitoring</h2>

      <div className="monitoring__header">
        <ul>
          {
            _PERIODS.map(p => {
              return (
                <li className={period == p.value ? 'active' : ''} onClick={() => setPeriod(p.value)}>{p.label}</li>
              )
            })
          }
        </ul>
      </div>

      <div className='monitoring__expence-income'>
        <div className='expence'>
          <span class="material-symbols-outlined icon">trending_up</span>
          <div className='expence__detail'>
            <span>Expence</span>
            <h2>$6.320</h2>
            <small>16 transactions</small>
          </div>
        </div>
        <div className='income'>
          <span class="material-symbols-outlined icon">trending_down</span>
          <div className='income__detail'>
            <span>Income</span>
            <h2>$6.320</h2>
            <small>16 transactions</small>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
