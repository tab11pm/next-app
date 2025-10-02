'use client'

import { createPortal } from 'react-dom'
import { useLoaderStore } from '@/store/loader.store'
import { Loader2 } from 'lucide-react'

export function LoaderRoot() {
	const { isOpen, close } = useLoaderStore()

	if (!isOpen) return
	return createPortal(
		<div
			aria-hidden={!isOpen}
			className="fixed inset-0 z-50 grid place-items-center bg-[rgb(var(--overlay))/0.4] backdrop-blur-[2px] animate-fade-in p-4"
			onMouseDown={(e) => e.target === e.currentTarget && close()}
		>
			<div
				role="dialog"
				aria-modal="true"
				className="w-full max-w-lg rounded-lg  p-6 text-center flex items-center justify-center animate-scale-in"
			>
				<Loader2 size={42} className="animate-spin" />
			</div>
		</div>,
		document.body
	)
}
