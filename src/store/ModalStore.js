import { create } from 'zustand'

export const useModalStore = create((set) => ({
  modalActive: '',
  setModalActive: (type) => {
    console.log(type)
    set(() => ({ modalActive: type }))
  },
}))
