import { Contact } from '@/types/contact.types'
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { CONTACTS_KEY } from '@/app/contacts/page'

type ContactsState = {
	contacts: Contact[]
	setContacts: (contact: Contact[]) => void
	addContact: (contact: Contact) => void
	editContact: (contact: Contact) => void
	deleteContact: (id: string) => void
}

export const useContactsStore = create<ContactsState>((set) => ({
	contacts: [],

	setContacts: (contacts) => set({ contacts }),

	addContact: (newContact) =>
		set((prev) => {
			if (!newContact) return prev // защита от null
			const c = { ...newContact, id: uuidv4() }
			localStorage.setItem(CONTACTS_KEY, JSON.stringify([c, ...prev.contacts]))
			return {
				contacts: [c, ...prev.contacts],
				contact: null,
			}
		}),

	editContact: (updatedContact) =>
		set((prev) => {
			const editContacts = prev.contacts.map((c) =>
				c.id === updatedContact.id ? updatedContact : c
			)
			localStorage.setItem(CONTACTS_KEY, JSON.stringify(editContacts))
			return {
				contacts: editContacts,
				contact: null,
			}
		}),

	deleteContact: (id) =>
		set((prev) => {
			const updateContact = prev.contacts.filter((item) => item.id !== id)
			console.log(id)

			localStorage.setItem(CONTACTS_KEY, JSON.stringify(updateContact))

			return {
				contacts: updateContact,
			}
		}),
}))
