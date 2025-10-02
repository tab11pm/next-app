import { IContacts } from '@/types/contact.types'
import { ContactsGrid, EmptyState } from '../common/ContactGrid'

export default function RenderContacts({
	contacts,
	onCreate,
	onDelete,
	onEdit,
}: IContacts) {
	return (
		<>
			{contacts && contacts.length > 0 ? (
				<ContactsGrid contacts={contacts} onDelete={onDelete} onEdit={onEdit} />
			) : (
				<EmptyState onCreate={onCreate} />
			)}
		</>
	)
}
