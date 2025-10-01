export async function handleUpload(data: {
	title: string
	description: string
	attachment: FileList
}) {
	const { title, description } = data
	const file = data.attachment?.[0]
	if (!file) throw new Error('Файл не выбран')
	localStorage.setItem('csr', JSON.stringify({ title, description }))
	const form = new FormData()
	form.append('attachment', file)

	const presignRes = await fetch('/api/s3/presign', {
		method: 'POST',
		body: form,
	})
	const presignJson = await presignRes.json()

	if (!presignRes.ok || !presignJson?.url || !presignJson?.key) {
		throw new Error('presign failed: ' + JSON.stringify(presignJson))
	}
	console.log(presignJson)

	const { url, key, contentType } = presignJson

	// 2) Грузим В S3 по presigned **PUT** URL
	const putRes = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': contentType || file.type || 'application/octet-stream',
		},
		body: file,
	})
	const putText = await putRes.text().catch(() => '')
	console.log('S3 PUT status:', putRes.status, putText)

	if (!putRes.ok) {
		throw new Error('Direct PUT failed ' + putRes.status + ' ' + putText)
	}

	// 3) Проверяем, что объект реально появился (HEAD через сервер)
	const headRes = await fetch(`/api/s3/head?key=${encodeURIComponent(key)}`)
	const headJson = await headRes.json().catch(() => ({}))
	console.log('HEAD:', headRes.status, headJson)

	if (!headRes.ok || !headJson?.exists) {
		throw new Error('Object not found after PUT: ' + JSON.stringify(headJson))
	}

	// 4) При необходимости — получить presigned GET для показа
	const getUrlRes = await fetch(`/api/s3/url?key=${encodeURIComponent(key)}`)
	const { url: getUrl } = await getUrlRes.json()
	console.log('GET url:', getUrl)

	// return { ok: true, key, getUrl }
	return { data: true, key }
}
