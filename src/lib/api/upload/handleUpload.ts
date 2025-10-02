export async function handleUpload(file: File) {
	if (!file) throw new Error('Файл не выбран')
	const form = new FormData()
	form.append('photo', file)

	const presignRes = await fetch('/api/s3/presign', {
		method: 'POST',
		body: form,
	})
	const presignJson = await presignRes.json()

	if (!presignRes.ok || !presignJson?.url || !presignJson?.key) {
		throw new Error('presign failed: ' + JSON.stringify(presignJson))
	}

	const { url, key, contentType } = presignJson

	// 2) Грузим В S3 по presigned **PUT** URL
	const putRes = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': contentType || file.type || 'application/octet-stream',
		},
		body: file,
	})

	if (!putRes.ok) {
		throw new Error('Direct PUT failed ' + putRes.status)
	}
	return { key }
}
