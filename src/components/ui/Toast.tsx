'use client'

import { create } from 'zustand'
import { useEffect } from 'react'

type Toast = { id: string; title: string; description?: string }
type ToastStore = {
	toasts: Toast[]
	push: (t: Omit<Toast, 'id'>) => void
	remove: (id: string) => void
}

export const useToast = create<ToastStore>((set) => ({
	toasts: [],
	push: (t) =>
		set((s) => ({ toasts: [...s.toasts, { id: crypto.randomUUID(), ...t }] })),
	remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export function Toaster() {
	const { toasts, remove } = useToast()
	useEffect(() => {
		const timers = toasts.map((t) => setTimeout(() => remove(t.id), 3000))
		return () => timers.forEach(clearTimeout)
	}, [toasts, remove])

	if (toasts.length === 0) return null
	return (
		<div className="fixed right-4 top-4 z-50 space-y-2">
			{toasts.map((t) => (
				<div
					key={t.id}
					role="status"
					className="rounded-md border border-[rgb(var(--border))] bg-white dark:bg-[rgb(var(--panel))] px-4 py-3 shadow-lg animate-slide-up"
				>
					<p className="text-md font-semibold">{t.title}</p>
					{t.description && (
						<p className="text-sm text-slate-600">{t.description}</p>
					)}
				</div>
			))}
		</div>
	)
}
