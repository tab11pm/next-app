'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, error, className, id, ...rest },
	ref
) {
	const inputId = id || rest.name
	return (
		<div className="space-y-1">
			{label && (
				<label
					htmlFor={inputId}
					className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
				>
					{label}
				</label>
			)}
			<input
				ref={ref}
				id={inputId}
				className={cn('input-base', className)}
				{...rest}
			/>
			{error && <p className="text-xs text-red-600">{error}</p>}
		</div>
	)
})
