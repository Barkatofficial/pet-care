import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  authLoading: false,

  setUser: (user) => set({ user }),
  setAuthLoading: (authLoading) => set({ authLoading })
}))
