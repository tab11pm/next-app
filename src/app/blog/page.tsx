import Link from 'next/link'
import { getPosts } from '@/lib/api/jsonplaceholder'
import Title from '@/components/ui/Title'

export const revalidate = 60 // ISR
export const metadata = { title: 'ISR: Посты' }

export default async function BlogPage() {
	const posts = await getPosts({ next: { revalidate } })

	return (
		<section className="container-prose">
			{/* <h1 className="text-2xl font-bold mb-4">ISR: список постов</h1> */}
			<h1 className="text-2xl font-bold mb-4 tracking-tight">
				<Title>ISR:</Title> список постов
			</h1>
			{/* <motion.button whileHover={{ scale: 1.1 }} /> */}
			<div className="grid gap-3">
				{posts.slice(0, 20).map((p) => (
					<article
						key={p.id}
						className="rounded-md border p-4 hover:bg-slate-50"
					>
						<h2 className="font-semibold">{p.title}</h2>
						<p className="text-sm text-slate-600 line-clamp-2">{p.body}</p>
						<Link
							className="text-brand-600 text-sm mt-2 inline-block"
							href={`/blog/${p.id}`}
						>
							Читать →
						</Link>
					</article>
				))}
			</div>
		</section>
	)
}
