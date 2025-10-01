import { Skeleton } from '@/components/ui/Skeleton'

export default function LoadingPost() {
	return (
		<article className="container-prose">
			<Skeleton className="h-8 w-3/4 mb-3" />
			<Skeleton className="h-4 w-full mb-1" />
			<Skeleton className="h-4 w-5/6 mb-1" />
			<Skeleton className="h-4 w-4/6" />
		</article>
	)
}
