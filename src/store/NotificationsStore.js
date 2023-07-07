import { create } from 'zustand'

export const useNotificationsStore = create((set) => ({
  listNotifications: [],
  addNotification: (notification) => set(state => ({listNotifications: [...state.listNotifications, notification]})),
  removeNotification: (notification) => set(state => ({ listNotifications: state.listNotifications.filter(n => n.id == notification.id) })),
}))
