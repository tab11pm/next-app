import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/api/jsonplaceholder'
import Link from 'next/link'

export const revalidate = 60

type Params = { id: string }
type Props15 = { params: Promise<Params> } // 👈 Next 15

export async function generateMetadata({ params }: Props15) {
	const { id } = await params
	const post = await getPostById(id, { next: { revalidate } })
	return { title: `Пост #${post.id} — ${post.title}` }
}

export default async function PostPage({ params }: Props15) {
	const { id } = await params
	const post = await getPostById(id, { next: { revalidate } }).catch(() => null)
	if (!post) return notFound()

	return (
		<article className="container-prose">
			<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
			<p className="text-slate-600">{post.body}</p>
			<p className="mt-6">
				<Link href="/blog" className="text-brand-600">
					← Назад к списку
				</Link>
			</p>
		</article>
	)
}
