import React from 'react';
import { useNotificationsStore } from '../../store/NotificationsStore';
import './notifications.css';

export default function Notifications() {
  const { listNotifications, removeNotification } = useNotificationsStore();

  return (
    <div className='notifications'>
      { 
        listNotifications.map(notification => {
          return (
            <div className={`notifications__notification ${notification.type}`} key={notification.id}>
              <i className='material-symbols-outlined'>{notification.icon}</i>
              <span>{notification.text}</span>
              <i className='material-symbols-outlined' onClick={() => removeNotification(notification.id)}>close</i>
            </div>
          )
        })
      }
    </div>
  )
}
