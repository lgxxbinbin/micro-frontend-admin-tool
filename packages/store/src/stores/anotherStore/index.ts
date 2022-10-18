import create from 'zustand'

type State = {
  bears: number
  increaseBears: () => void
  removeAllBears?: () => void
}

export const useBearStore = create<State>((set) => ({
  bears: 0,
  increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
