import { Contact } from '@/types/contact.types'

export default function ContactsAction({
	c,
	onDelete,
	onEdit,
}: {
	c: Contact
	onEdit: (contact: Contact) => void
	onDelete: (contact: Contact) => void
}) {
	return (
		<>
			<div className="mt-4 flex items-center justify-end gap-2">
				<button
					onClick={() => onEdit(c)}
					className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
				>
					Редактировать
				</button>
				<button
					onClick={() => onDelete(c)}
					className="rounded-xl bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
				>
					Удалить
				</button>
			</div>
		</>
	)
}
