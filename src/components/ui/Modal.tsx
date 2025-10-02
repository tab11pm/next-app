'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModalStore } from '@/store/modal.store'
import { Button } from './Button'

export function ModalRoot() {
	const { isOpen, content, close, title } = useModalStore()

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
		document.addEventListener('keydown', onKey)
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => {
			document.removeEventListener('keydown', onKey)
			document.body.style.overflow = ''
		}
	}, [isOpen, close])

	if (typeof document === 'undefined' || !isOpen) return null

	return createPortal(
		<div
			aria-hidden={!isOpen}
			className="fixed inset-0 z-50 grid place-items-center bg-[rgb(var(--overlay))/0.4] backdrop-blur-[2px] animate-fade-in p-4"
			onMouseDown={(e) => e.target === e.currentTarget && close()}
		>
			<div
				role="dialog"
				aria-modal="true"
				className="w-full max-w-lg rounded-lg bg-white dark:bg-[rgb(var(--panel))] p-6 shadow-xl ring-1 ring-[rgb(var(--border))] animate-scale-in"
			>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">{title}</h2>
					<Button variant="ghost" aria-label="Закрыть" onClick={close}>
						✕
					</Button>
				</div>
				<div className="animate-slide-up">{content}</div>
			</div>
		</div>,
		document.body
	)
}
