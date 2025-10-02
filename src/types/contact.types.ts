export type Contact = {
	id: string
	name: string
	phone: string
	photo: string
	file?: File
	key: string
}

export interface IContactGrid {
	contacts: Contact[]
	onEdit: (c: Contact) => void
	onDelete: (c: Contact) => void
}

export interface IEmptyContact {
	onCreate: () => void
}

export interface IContacts extends IContactGrid {
	onCreate: () => void
}
