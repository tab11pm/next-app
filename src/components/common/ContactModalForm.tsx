import { handleUpload } from '@/lib/api/upload/handleUpload'
import { cn } from '@/lib/cn'
import { Contact } from '@/types/contact.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useToast } from '../ui/Toast'
import GetContactImg from '../features/GetContactImg'
import { ContactsUploadImage } from '../features/ContactsUploadImage'
import { useLoaderStore } from '@/store/loader.store'
// ---- Types ----
const contactSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(2, 'Минимум 2 символа'),
	phone: z
		.string()
		.min(9, 'Телефон слишком короткий')
		.regex(/^[+0-9\-()\s]+$/, 'Допустимы только цифры и + - ( ) пробелы'),
	photo: z.string().url().optional().or(z.literal('')),
	file: z.file().optional(),
	key: z.string().optional(),
})

type FormValues = z.infer<typeof contactSchema>

export default function ContactFormModal({
	onClose,
	onSubmit,
	initial,
}: {
	onClose: () => void
	onSubmit: (c: Contact) => void
	initial?: Contact
}) {
	const { push } = useToast()
	const { open, close } = useLoaderStore()

	const formSchema = contactSchema.omit({ id: true })
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		control,
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initial?.name || '',
			phone: initial?.phone || '',
			photo: initial?.photo || '',
		},
	})

	// Reset form when initial changes or modal toggles
	useEffect(() => {
		reset({
			name: initial?.name || '',
			phone: initial?.phone || '',
			photo: initial?.photo || '',
		})
	}, [initial, reset])

	const submit = handleSubmit(async (values) => {
		console.log(values)

		open()
		let key = ''
		// If a file is selected, upload to S3
		const file = values.file
		if (file) {
			debugger
			const data = await handleUpload(file)
			key = data.key
		}

		const parsed = contactSchema.safeParse({
			...values,
			key,
		})
		close()
		if (!parsed.success) return // zod will display errors via resolver

		if (parsed.data) {
			push({ title: 'Проверка формы', description: 'UI отправка прошла' })
		} else {
			push({ title: 'Проверка формы', description: 'Ошибка сервера' })
		}
		onSubmit({ ...(parsed.data as Contact), id: initial?.id })
	})

	return (
		<form onSubmit={submit} className="space-y-4">
			<div className="flex items-start gap-4">
				<GetContactImg c={initial} />

				<div className="flex-1 space-y-3">
					<div>
						<label className="mb-1 block text-sm font-medium">Имя</label>
						<input
							{...register('name')}
							placeholder="Иван Иванов"
							className={cn(
								'w-full rounded-2xl border px-4 py-2 text-sm outline-none',
								errors.name && 'border-red-500'
							)}
						/>
						{errors.name && (
							<p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
						)}
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium">Телефон</label>
						<input
							{...register('phone')}
							placeholder="+992 900 00 00"
							className={cn(
								'w-full rounded-2xl border px-4 py-2 text-sm outline-none',
								errors.phone && 'border-red-500'
							)}
						/>
						{errors.phone && (
							<p className="mt-1 text-xs text-red-600">
								{errors.phone.message}
							</p>
						)}
					</div>

					<ContactsUploadImage name="file" control={control} />
				</div>
			</div>

			<div className="flex justify-end gap-2 pt-2">
				<button
					type="button"
					onClick={onClose}
					className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
				>
					Отмена
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-xl bg-black px-4 py-2 text-sm text-white shadow hover:bg-gray-900 disabled:opacity-60"
				>
					{initial ? 'Сохранить' : 'Создать'}
				</button>
			</div>
		</form>
	)
}
