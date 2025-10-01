'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'ghost'
	loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
	{ className, variant = 'primary', loading, disabled, children, ...rest },
	ref
) {
	const base =
		'btn-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60'
	// const styles = {
	// 	primary: 'bg-brand-600 text-white hover:bg-brand-500',
	// 	secondary:
	// 		'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50',
	// 	ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
	// }[variant]

	const styles = {
		primary:
			'bg-brand-600 text-white hover:bg-brand-500 active:translate-y-[1px] focus-visible:ring-2 focus-visible:ring-brand-500',
		secondary:
			'bg-white dark:bg-[rgb(var(--panel))] border border-[rgb(var(--border))] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800',
		ghost:
			'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5',
	}[variant]

	return (
		<button
			ref={ref}
			className={cn(base, styles, className)}
			disabled={disabled || loading}
			{...rest}
		>
			{loading ? 'Загрузка…' : children}
		</button>
	)
})
