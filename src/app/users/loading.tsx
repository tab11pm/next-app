import { Skeleton } from '@/components/ui/Skeleton'

export default function LoadingUsers() {
	return (
		<section className="container-prose">
			<Skeleton className="h-7 w-52 mb-4" />
			<div className="grid gap-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="rounded-md border border-slate-200 dark:border-slate-700 p-4"
					>
						<Skeleton className="h-4 w-48 mb-2" />
						<Skeleton className="h-3 w-32 mb-2" />
						<Skeleton className="h-3 w-40" />
					</div>
				))}
			</div>
		</section>
	)
}
