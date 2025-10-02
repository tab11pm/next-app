import { Upload } from 'lucide-react'

type Props = {
	hint: string
	maxSizeMB: number
}
export default function FilePreview({ hint, maxSizeMB }: Props) {
	return (
		<>
			<div className="flex flex-col items-center gap-2 p-6 text-center select-none">
				<div className="rounded-full p-3 shadow-sm border border-neutral-200 dark:border-neutral-800">
					<Upload className="h-6 w-6" aria-hidden />
				</div>
				<div className="text-sm text-neutral-600 dark:text-neutral-300">
					Перетащите изображение сюда или{' '}
					<span className="font-medium underline">выберите файл</span>
				</div>
				<div className="text-xs text-neutral-500">
					{hint || `до ${maxSizeMB}MB`}
				</div>
			</div>
		</>
	)
}
