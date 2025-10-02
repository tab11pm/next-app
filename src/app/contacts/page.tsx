'use client'

import ContactFormModal from '@/components/common/ContactModalForm'
import ConfirmModal from '@/components/features/ConfirmModal'
import RenderContacts from '@/components/features/RenderContacts'
import { useContactsStore } from '@/store/contacts.store'
import { useModalStore } from '@/store/modal.store'
import { Contact } from '@/types/contact.types'
import { useEffect } from 'react'
export const CONTACTS_KEY = 'contacts'

export default function ContactsUI() {
	const { close, open } = useModalStore()
	const { addContact, contacts, setContacts, deleteContact, editContact } =
		useContactsStore()
	// const [contacts, setContacts] = useState<Contact[]>([])

	// Load from localStorage on mount
	useEffect(() => {
		if (typeof window === 'undefined') return
		const raw = localStorage.getItem(CONTACTS_KEY)
		if (!raw) return
		try {
			const parsed = JSON.parse(raw) as Contact[]
			setContacts(parsed)
		} catch (err) {
			console.error(err)
		}
	}, [])

	// Persist to localStorage on change
	useEffect(() => {
		if (typeof window === 'undefined') return
		localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
	}, [contacts])

	const openCreate = () => {
		open(
			<ContactFormModal
				onClose={close}
				onSubmit={(c) => {
					addContact(c)
					close()
				}}
			/>,
			'Добавления контакта'
		)
	}

	const openEdit = (c: Contact) => {
		open(
			<ContactFormModal
				onClose={close}
				onSubmit={(c) => {
					editContact(c)
					close()
				}}
				initial={c}
			/>,
			'Изменения контакта'
		)
	}

	const askDelete = (c: Contact) => {
		open(
			<ConfirmModal
				message={`Удалить контакт «${c.name}»? Это действие необратимо.`}
				onClose={() => {
					close()
				}}
				onConfirm={() => doDelete(c.id)}
			/>,
			'Подтверждение'
		)
	}

	const doDelete = (id) => {
		deleteContact(id)
		close()
	}

	return (
		<div className="mx-auto max-w-5xl p-6">
			<header className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Контакты</h1>
				<button
					onClick={openCreate}
					className="rounded-2xl bg-black px-4 py-2 text-white shadow hover:bg-gray-900"
				>
					+ Новый контакт
				</button>
			</header>

			<RenderContacts
				contacts={contacts}
				onCreate={openCreate}
				onDelete={askDelete}
				onEdit={openEdit}
			/>
		</div>
	)
}
