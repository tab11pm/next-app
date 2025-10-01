import { create } from 'zustand'

type ModalState = {
	isOpen: boolean
	content: React.ReactNode | null
	open: (content: React.ReactNode) => void
	close: () => void
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	content: null,
	open: (content) => set({ isOpen: true, content }),
	close: () => set({ isOpen: false, content: null }),
}))
