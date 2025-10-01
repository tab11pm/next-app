import Title from '@/components/ui/Title'
import { getUsers } from '@/lib/api/jsonplaceholder'
import LoadingUsers from './loading'
export const dynamic = 'force-dynamic' // или fetch(..., { cache: 'no-store' })

export const metadata = { title: 'SSR: Пользователи' }

export default async function UsersPage() {
	const users = await getUsers({ cache: 'no-store' })
	// const { isLoader } = useLoaderStore()
	return (
		<section className="container-prose">
			<h1 className="text-2xl font-bold mb-4">
				<Title>SSR</Title>: пользователи
			</h1>
			<div className="grid gap-3">
				{users.map((u) => (
					<div key={u.id} className="rounded-md border p-4">
						<div className="font-semibold">{u.name}</div>
						<div className="text-sm text-slate-600">@{u.username}</div>
						<a
							href={`mailto:${u.email}`}
							className="text-sm text-brand-600 mt-2 inline-block"
						>
							{u.email}
						</a>
					</div>
				))}
			</div>
		</section>
	)
}
