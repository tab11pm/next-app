import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/api/jsonplaceholder'

export const revalidate = 60 // ISR для отдельных постов

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
	const post = await getPostById(params.id, { next: { revalidate } })
	return { title: `Пост #${post.id} — ${post.title}` }
}

export default async function PostPage({ params }: Props) {
	const post = await getPostById(params.id, { next: { revalidate } }).catch(
		() => null
	)
	if (!post) return notFound()

	return (
		<article className="container-prose">
			<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
			<p className="text-slate-600">{post.body}</p>
			<p className="mt-6">
				<a href="/blog" className="text-brand-600">
					← Назад к списку
				</a>
			</p>
		</article>
	)
}
