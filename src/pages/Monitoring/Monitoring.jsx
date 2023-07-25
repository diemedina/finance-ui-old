import React, { useState } from 'react';
import { Navbar } from 'src/components/Navbar/Navbar';
import MockCategories from 'src/mocks/categories';
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
          <span className="material-symbols-outlined icon">trending_up</span>
          <div className='expence__detail'>
            <span>Expence</span>
            <h2>$6.320</h2>
            <small>16 transactions</small>
          </div>
        </div>
        <div className='income'>
          <span className="material-symbols-outlined icon">trending_down</span>
          <div className='income__detail'>
            <span>Income</span>
            <h2>$6.320</h2>
            <small>16 transactions</small>
          </div>
        </div>
      </div>

      <div className='monitoring__graph'>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '30%'}}></div>
            <div className='expence' style={{height: '20%'}}></div>
          </div>
          <small>12 Apr</small>
        </div>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '45%'}}></div>
            <div className='expence' style={{height: '12%'}}></div>
          </div>
          <small>13 Apr</small>
        </div>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '12%'}}></div>
            <div className='expence' style={{height: '67%'}}></div>
          </div>
          <small>14 Apr</small>
        </div>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '22%'}}></div>
            <div className='expence' style={{height: '46%'}}></div>
          </div>
          <small>15 Apr</small>
        </div>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '21%'}}></div>
            <div className='expence' style={{height: '22%'}}></div>
          </div>
          <small>16 Apr</small>
        </div>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '56%'}}></div>
            <div className='expence' style={{height: '32%'}}></div>
          </div>
          <small>17 Apr</small>
        </div>
        <div className='monitoring__graph__item'>
          <div className='monitoring__graph__item__bar'>
            <div className='income' style={{height: '12%'}}></div>
            <div className='expence' style={{height: '12%'}}></div>
          </div>
          <small>18 Apr</small>
        </div>
      </div>

      <div className="monitoring__top-categories">
        <h3>Top categories</h3>
        <div className='monitoring__top-categories__container'>
          <div className='monitoring__top-categories__container__item'>
            <div className={MockCategories['FOOD'].class + ' icon'}>{MockCategories['FOOD'].icon}</div>
            <div className='monitoring__top-categories__container__item__detail'>
              <span>Food <small>10 transactions</small></span>
              <div>
                <div className={MockCategories['FOOD'].class + ' animate__animated animate__fadeIn'} style={{width: '60%'}}></div>
              </div>
            </div>
          </div>

          <div className='monitoring__top-categories__container__item'>
            <div className={MockCategories['SHOP'].class + ' icon'}>{MockCategories['SHOP'].icon}</div>
            <div className='monitoring__top-categories__container__item__detail'>
              <span>Shop <small>4 transactions</small></span>
              <div>
                <div className={MockCategories['SHOP'].class + ' animate__animated animate__fadeIn'} style={{width: '30%'}}></div>
              </div>
            </div>
          </div>

          <div className='monitoring__top-categories__container__item'>
            <div className={MockCategories['HOUSE'].class + ' icon'}>{MockCategories['HOUSE'].icon}</div>
            <div className='monitoring__top-categories__container__item__detail'>
              <span>House <small>2 transactions</small></span>
              <div>
                <div className={MockCategories['HOUSE'].class + ' animate__animated animate__fadeIn'} style={{width: '10%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
