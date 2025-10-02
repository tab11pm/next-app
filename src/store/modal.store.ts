import { create } from 'zustand'

type ModalState = {
	isOpen: boolean
	content: React.ReactNode | null
	title: string
	open: (content: React.ReactNode, title: string) => void
	close: () => void
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	content: null,
	title: '',
	open: (content, title) => set({ isOpen: true, content, title }),
	close: () => set({ isOpen: false, content: null, title: '' }),
}))
