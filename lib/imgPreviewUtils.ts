export function formatBytes(bytes: number) {
	if (bytes === 0) return '0 B'
	const k = 1024
	const sizes = ['B', 'KB', 'MB', 'GB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

// Safe check for File in SSR/Node and a proper TS type guard
export function isBrowserFile(val: unknown): val is File {
	return typeof File !== 'undefined' && val instanceof File
}
