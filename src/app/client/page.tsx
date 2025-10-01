'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient, Post } from '@/lib/api/jsonplaceholder'
import { OpenCreatePostModalButton } from '@/components/features/create-post/OpenCreatePostModalButton'
import { Skeleton } from '@/components/ui/Skeleton'
import Title from '@/components/ui/Title'

async function fetchClientPosts(): Promise<Post[]> {
	return apiClient<Post[]>('/posts')
}

export default function ClientOnlyPage() {
	const {
		data,
		isFetching: isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['client-posts'],
		queryFn: fetchClientPosts,
	})

	return (
		<section className="container-prose">
			<h1 className="text-2xl font-bold mb-4">
				<Title>CSR:</Title> данные только на клиенте
			</h1>

			<div className="flex gap-2 mb-4">
				<button
					className="btn-base bg-slate-800 text-white"
					onClick={() => refetch()}
				>
					Обновить
				</button>
				<OpenCreatePostModalButton />
			</div>

			{isLoading && (
				<ul className="grid gap-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<li
							key={i}
							className="rounded-md border border-slate-200 dark:border-slate-700 p-4"
						>
							<Skeleton className="h-4 w-2/3 mb-2" />
							<Skeleton className="h-3 w-full mb-1" />
							<Skeleton className="h-3 w-5/6" />
						</li>
					))}
				</ul>
			)}

			{isError && <p className="text-red-600">Ошибка при загрузке</p>}

			{!isLoading && (
				<ul className="grid gap-3">
					{data?.slice(0, 10).map((p) => (
						<li key={p.id} className="rounded-md border p-4">
							<div className="font-semibold">{p.title}</div>
							<p className="text-sm text-slate-600 dark:text-slate-300/90 line-clamp-2">
								{p.body}
							</p>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
