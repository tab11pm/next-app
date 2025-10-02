export const clearPhoto = (onChange, setPreviewUrl, inputRef) => {
	onChange(null)
	setPreviewUrl(null)
	if (inputRef.current) inputRef.current.value = ''
}
