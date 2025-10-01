'use client'
import { Button } from '@/components/ui/Button'
import { useModalStore } from '@/store/modal.store'
import { CreatePostFormUI } from '@/components/features/create-post/CreatePostModal'
import { handleUpload } from '@/lib/api/upload/handleUpload'
import { useToast } from '@/components/ui/Toast'

export function OpenCreatePostModalButton() {
	const { push } = useToast()

	const { open, close } = useModalStore()
	const handleSubmit = async (data: {
		title: string
		description: string
		attachment: FileList
	}) => {
		const res = await handleUpload(data)
		console.log(res.error)

		if (res.data) {
			push({ title: 'Проверка формы', description: 'UI отправка прошла' })
			close()
		} else {
			push({ title: 'Проверка формы', description: res.error })
		}
	}
	return (
		<Button onClick={() => open(<CreatePostFormUI onSubmit={handleSubmit} />)}>
			Открыть модалку
		</Button>
	)
}
