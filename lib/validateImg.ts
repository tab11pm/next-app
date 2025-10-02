export const validateFile = (file: File, maxSizeMB, formatBytes) => {
	const isImage = file.type.startsWith('image/')
	if (!isImage) {
		return {
			ok: false,
			message: 'Пожалуйста, выберите изображение (image/*).',
		}
	}
	const maxBytes = maxSizeMB * 1024 * 1024
	if (file.size > maxBytes) {
		return {
			ok: false,
			message: `Размер файла превышает ${maxSizeMB}MB (сейчас ${formatBytes(
				file.size
			)}).`,
		}
	}
	return { ok: true } as const
}
