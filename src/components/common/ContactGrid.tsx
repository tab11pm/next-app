import { IContactGrid, IEmptyContact } from '@/types/contact.types'
import { useMemo, useState } from 'react'
import ContactsAction from '../features/ContactsAction'
import GetContactImg from '../features/GetContactImg'

export function EmptyState({ onCreate }: IEmptyContact) {
	return (
		<div className="rounded-3xl border border-dashed p-12 text-center">
			<div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gray-100 p-3">
				📇
			</div>
			<h2 className="mb-2 text-lg font-semibold">Список пуст</h2>
			<p className="mb-6 text-sm text-gray-600">Добавьте ваш первый контакт.</p>
			<button
				onClick={onCreate}
				className="rounded-2xl bg-black px-4 py-2 text-white shadow hover:bg-gray-900"
			>
				Добавить контакт
			</button>
		</div>
	)
}

export function ContactsGrid({ contacts, onEdit, onDelete }: IContactGrid) {
	// const {deleteContact, editContact} = useContactsStore()
	const [query, setQuery] = useState('')
	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (!q) return contacts
		return contacts.filter(
			(c) => c.name.toLowerCase().includes(q) || c.phone.includes(q)
		)
	}, [contacts, query])

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-3">
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Поиск по имени, телефону"
					className="w-full rounded-2xl border px-4 py-2 text-sm outline-none ring-0 focus:border-black"
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((c) => (
					<article
						key={c.id}
						className="group rounded-3xl border  p-4 shadow-sm transition hover:shadow"
					>
						<div className="flex items-start gap-4">
							<GetContactImg c={c} />
							<div className="min-w-0 flex-1">
								<h3 className="truncate text-base font-semibold">{c.name}</h3>
								<p className="truncate text-sm text-gray-600">{c.phone}</p>
							</div>
						</div>

						<ContactsAction c={c} onDelete={onDelete} onEdit={onEdit} />
					</article>
				))}
			</div>
		</div>
	)
}
