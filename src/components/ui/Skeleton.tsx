import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={cn(
				'relative overflow-hidden rounded-md bg-slate-200/80 dark:bg-slate-700/60',
				'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r',
				'before:from-transparent before:via-white/40 before:to-transparent',
				'before:animate-[shimmer_1.2s_infinite]',
				className
			)}
		/>
	)
}
