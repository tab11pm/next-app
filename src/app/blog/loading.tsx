import { Skeleton } from '@/components/ui/Skeleton'

export default function LoadingBlogList() {
	return (
		<section className="container-prose">
			<div className="h-7 w-64 mb-4">
				<Skeleton className="h-full w-full" />
			</div>
			<div className="grid gap-3">
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className="rounded-md border border-slate-200 dark:border-slate-700 p-4"
					>
						<div className="mb-2">
							<Skeleton className="h-4 w-2/3" />
						</div>
						<Skeleton className="h-3 w-full mb-1" />
						<Skeleton className="h-3 w-5/6" />
					</div>
				))}
			</div>
		</section>
	)
}
