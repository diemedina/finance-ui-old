import { create } from 'zustand'
import { v4 as uuid } from 'uuid';

export const useNotificationsStore = create((set, get) => ({
  listNotifications: [],
  setClassNotification: (id) => {
    const listNotifications = get().listNotifications;
    const idxNotification = get().listNotifications.findIndex(n => n.id == id);

    listNotifications[idxNotification] = {...listNotifications[idxNotification], class: 'animate__fadeOutUp'}
    set(() => ({ listNotifications: listNotifications }))
  },
  removeNotification: (notification) => {
    get().setClassNotification(notification.id)
    setTimeout(() => {
      set(state => ({ listNotifications: state.listNotifications.filter(n => n.id != notification.id) }))
    }, 500);
  },
  addNotification: (notification) => { 
    const id = uuid();
    notification = {...notification, id}
    set(state => ({listNotifications: [...state.listNotifications, notification]}))
    
    setTimeout(() => get().removeNotification({id}), 5000);
  }
}))
