'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/Input'
import { FileInput } from '@/components/ui/FileInput'
import { Button } from '@/components/ui/Button'

const Schema = z.object({
	title: z.string().min(3, 'Минимум 3 символа'),
	description: z.string(),
	attachment: z.any().refine((f) => !!f && f.length > 0, 'Файл обязателен'),
})

type FormValues = z.infer<typeof Schema>

export function CreatePostFormUI({
	onSubmit,
}: {
	onSubmit: (data: FormValues) => void
}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(Schema),
	})

	return (
		<form
			className="space-y-4"
			onSubmit={handleSubmit((data) => {
				onSubmit(data)
			})}
		>
			<Input
				label="Заголовок"
				placeholder="Введите заголовок"
				{...register('title')}
				error={errors.title?.message}
			/>
			<Input
				label="Описания"
				placeholder="Введите описания"
				{...register('description')}
				error={errors.title?.message}
			/>
			<FileInput
				label="Вложение"
				hint="PNG/JPG/PDF"
				{...register('attachment')}
				// error={errors.attachment?.message}
			/>
			<div className="flex justify-end gap-2">
				<Button type="submit" loading={isSubmitting}>
					Отправить
				</Button>
			</div>
		</form>
	)
}
