'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: string
	hint?: string
	error?: string
}

export const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
	{ label, hint, error, className, id, ...rest },
	ref
) {
	const inputId = id || rest.name
	return (
		<div className="space-y-1">
			{label && (
				<label htmlFor={inputId} className="text-sm font-medium text-slate-700">
					{label}
				</label>
			)}
			<input
				ref={ref}
				id={inputId}
				type="file"
				className={cn(
					'block w-full rounded-md border border-dashed bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm hover:file:bg-slate-200',
					'dark:bg-[rgb(var(--panel))] dark:border-[rgb(var(--border))] dark:text-[rgb(var(--fg))] dark:file:bg-slate-700 dark:hover:file:bg-slate-600',
					className
				)}
				{...rest}
			/>
			{hint && <p className="text-xs text-slate-500">{hint}</p>}
			{error && <p className="text-xs text-red-600">{error}</p>}
		</div>
	)
})
