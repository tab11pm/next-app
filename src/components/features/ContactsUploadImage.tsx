'use client'

import * as React from 'react'
import { useController, type FieldValues } from 'react-hook-form'
import { PhotoPickerFieldProps } from '@/types/imageUpload.types'
import { validateFile } from 'lib/validateImg'
import { clearPhoto } from 'lib/clearPhoto'
import { useLoaderStore } from '@/store/loader.store'
import ImagePreview from './ImagePreview'
import FilePreview from '../ui/FilePreview'
import { formatBytes, isBrowserFile } from 'lib/imgPreviewUtils'

export function ContactsUploadImage<TFieldValues extends FieldValues>({
	name,
	control,
	label = 'Фотография',
	hint = 'PNG, JPG, WEBP до 5MB',
	maxSizeMB = 5,
	disabled,
	className,
}: PhotoPickerFieldProps<TFieldValues>) {
	const inputRef = React.useRef<HTMLInputElement | null>(null)
	const [dragOver, setDragOver] = React.useState(false)
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
	const { isOpen: loading, open, close } = useLoaderStore()
	const {
		field: { value, onChange, onBlur, ref },
		fieldState: { error },
	} = useController({ name, control })

	// Create preview when value is a File
	React.useEffect(() => {
		if (isBrowserFile(value)) {
			const url = URL.createObjectURL(value)
			setPreviewUrl(url)
			return () => URL.revokeObjectURL(url)
		}
		setPreviewUrl(null)
	}, [value])

	const pick = () => inputRef.current?.click()

	const handleFiles = async (files: FileList | null) => {
		if (!files || files.length === 0) return
		const file = files[0]
		const res = validateFile(file, maxSizeMB, formatBytes)
		if (!res.ok) {
			// react-hook-form expects field-level error messages to be handled via onChange + error resolver,
			// but we can surface a temporary error via a synthetic value with message using a small trick:
			// set the value, then immediately revert while showing message via a transient state.
			// For simplicity, we just avoid changing the value and show a toast-like inline error.
			alert(res.message) // replace with your toast system if you have one
			return
		}
		open()
		try {
			// Simulate tiny delay for UX (e.g., decoding). You can remove this.
			await new Promise((r) => setTimeout(r, 120))
			onChange(file)
		} finally {
			close()
		}
	}

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragOver(false)
		if (disabled) return
		handleFiles(e.dataTransfer.files)
	}

	const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (disabled) return
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			pick()
		}
	}

	return (
		<div className={'w-full ' + (className ?? '')}>
			{label && (
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
					{label}
				</label>
			)}

			<div
				role="button"
				tabIndex={0}
				onKeyDown={onKeyDown}
				onClick={() => !disabled && pick()}
				onDragEnter={(e) => {
					e.preventDefault()
					if (!disabled) setDragOver(true)
				}}
				onDragOver={(e) => {
					e.preventDefault()
					if (!disabled) setDragOver(true)
				}}
				onDragLeave={(e) => {
					e.preventDefault()
					setDragOver(false)
				}}
				onDrop={onDrop}
				aria-disabled={disabled}
				className={[
					'relative flex min-h-[160px] items-center justify-center rounded-2xl border-2 border-dashed transition-all',
					'bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm',
					disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
					dragOver
						? 'border-indigo-500/80 ring-4 ring-indigo-200/50'
						: 'border-neutral-200 dark:border-neutral-800',
				].join(' ')}
			>
				{/* Hidden input */}
				<input
					ref={(node) => {
						inputRef.current = node
						ref(node)
					}}
					type="file"
					accept="image/*"
					onBlur={onBlur}
					onChange={(e) => handleFiles(e.currentTarget.files)}
					className="sr-only"
					disabled={disabled}
				/>

				{/* Empty state */}
				{!previewUrl && !loading && (
					<FilePreview hint={hint} maxSizeMB={maxSizeMB} />
				)}

				{/* Preview */}
				{previewUrl && !loading && (
					<ImagePreview
						onChange={(e) => {
							e.stopPropagation()
							pick()
						}}
						onDelete={(e) => {
							e.stopPropagation()
							clearPhoto(onChange, setPreviewUrl, inputRef)
						}}
						previewUrl={previewUrl}
					/>
				)}
			</div>

			{/* Error */}
			{error?.message && (
				<p className="mt-2 text-sm text-red-600">{String(error.message)}</p>
			)}
		</div>
	)
}
