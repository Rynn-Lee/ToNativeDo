import { create } from 'zustand'

export const useCardStore = create((set) => ({
  cards: [],
  setCards: (data: any) => set(() => ({cards: data}))
}))