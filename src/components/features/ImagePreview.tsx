import { ImagePlus, Trash2 } from 'lucide-react'
import type { MouseEventHandler } from 'react'

type Props = {
	previewUrl: string
	onDelete: MouseEventHandler<HTMLButtonElement>
	onChange: MouseEventHandler<HTMLButtonElement>
}

export default function ImagePreview({
	previewUrl,
	onDelete,
	onChange,
}: Props) {
	return (
		<div className="relative w-full h-[280px] overflow-hidden">
			<img
				src={previewUrl}
				alt="Предпросмотр фотографии"
				className="object-cover rounded-2xl size-full"
				draggable={false}
			/>
			<div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
				<button
					type="button"
					onClick={onChange}
					className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm font-medium shadow-sm bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800"
				>
					<ImagePlus className="h-4 w-4" /> Заменить
				</button>
				<button
					type="button"
					onClick={onDelete}
					className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm font-medium shadow-sm bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800"
				>
					<Trash2 className="h-4 w-4" /> Удалить
				</button>
			</div>
		</div>
	)
}
