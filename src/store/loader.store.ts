import { create } from 'zustand'

type LoaderState = {
	isLoader: boolean
	open: (content: React.ReactNode) => void
	close: () => void
}

export const useLoaderStore = create<LoaderState>((set) => ({
	isLoader: false,
	open: () => set({ isLoader: true }),
	close: () => set({ isLoader: false }),
	toggle: () => set((state) => ({ isLoader: !state.isLoader })),
}))
