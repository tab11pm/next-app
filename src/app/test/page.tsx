'use client'
import React, { useRef, useState } from 'react'

/**
 * Drop this file in: app/upload/page.tsx (App Router)
 *
 * Assumes you have an API route that returns a presigned PUT URL like:
 *   POST /api/s3/presign
 *   => { url: string; key: string; contentType: string; expiresIn: number }
 *
 * If your API path is different, change PRESIGN_ENDPOINT below.
 */

const PRESIGN_ENDPOINT = '/api/s3/presign' // ← adjust if your route differs

export default function UploadPage() {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [progress, setProgress] = useState<number>(0)
	const [status, setStatus] = useState<
		| { kind: 'idle' }
		| { kind: 'presigning' }
		| { kind: 'uploading' }
		| { kind: 'done'; key: string }
		| { kind: 'error'; message: string }
	>({ kind: 'idle' })

	const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0]
		setFile(f ?? null)
		setProgress(0)
		setStatus({ kind: 'idle' })
	}

	async function handleUpload() {
		if (!file) {
			inputRef.current?.click()
			return
		}

		try {
			setStatus({ kind: 'presigning' })

			// The backend you posted supports multipart/form-data OR JSON.
			// We'll send FormData with the file under "attachment".
			const form = new FormData()
			form.append('attachment', file)

			const presignRes = await fetch(PRESIGN_ENDPOINT, {
				method: 'POST',
				body: form,
			})

			if (!presignRes.ok) {
				const err = await safeJson(presignRes)
				throw new Error(err?.error || `Presign failed (${presignRes.status})`)
			}

			const { url, key, contentType } = (await presignRes.json()) as {
				url: string
				key: string
				contentType: string
				expiresIn: number
			}
			console.log(url)

			setStatus({ kind: 'uploading' })

			// Use XMLHttpRequest to track upload progress  (fetch doesn't support upload progress events)
			await putWithProgress(url, file, contentType, (p) => setProgress(p))

			setStatus({ kind: 'done', key })
		} catch (e: any) {
			setStatus({ kind: 'error', message: e?.message ?? 'Unknown error' })
		}
	}

	return (
		<main className="min-h-screen  flex items-center justify-center p-6">
			<div className="w-full max-w-xl">
				<div className="shadow rounded-2xl dark:shadow-gray-50 p-6">
					<h1 className="text-2xl font-semibold mb-2">
						Upload to S3 (Presigned URL)
					</h1>
					<p className="text-sm dark:text-gray-600 mb-6">
						This client requests a presigned <code>PUT</code> URL from your
						Next.js API and then uploads the file directly to S3 from the
						browser.
					</p>

					<div className="flex items-center gap-4 border-2 border-dashed border-gray-300 rounded-xl p-5 mb-4">
						<input
							ref={inputRef}
							type="file"
							onChange={onPick}
							className="hidden"
						/>

						<button
							onClick={() => inputRef.current?.click()}
							className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
						>
							Choose file
						</button>
						<div className="text-sm text-gray-700 truncate">
							{file ? (
								<>
									<div className="font-medium">{file.name}</div>
									<div className="text-gray-500 text-xs">
										{(file.size / 1024 / 1024).toFixed(2)} MB ·{' '}
										{file.type || '(unknown MIME)'}
									</div>
								</>
							) : (
								<span>No file selected</span>
							)}
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={handleUpload}
							disabled={
								status.kind === 'presigning' || status.kind === 'uploading'
							}
							className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-500 transition"
						>
							{status.kind === 'presigning'
								? 'Requesting URL…'
								: status.kind === 'uploading'
								? 'Uploading…'
								: file
								? 'Upload'
								: 'Pick a file'}
						</button>

						{status.kind === 'uploading' && (
							<div className="flex-1">
								<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-blue-600"
										style={{ width: `${progress}%` }}
									/>
								</div>
								<div className="text-xs text-gray-600 mt-1">
									{progress.toFixed(0)}%
								</div>
							</div>
						)}
					</div>

					<div className="mt-4 min-h-[1.5rem] text-sm">
						{status.kind === 'done' && <SuccessBox s3Key={status.key} />}
						{status.kind === 'error' && (
							<div className="text-red-600">{status.message}</div>
						)}
					</div>

					<Tips />
				</div>
			</div>
		</main>
	)
}

function SuccessBox({ s3Key }: { s3Key: string }) {
	return (
		<div className="rounded-xl border border-green-200 bg-green-50 p-3">
			<div className="font-medium text-green-800">Uploaded successfully</div>
			<div className="text-xs text-green-700 mt-1">
				S3 object key:
				<code className="ml-1 rounded bg-white/60 px-1 py-0.5">{s3Key}</code>
			</div>
			<div className="text-xs text-green-700 mt-2">
				Note: Unless your bucket/object has public access or you generate a
				presigned <code>GET</code> URL, the file won't be directly viewable.
			</div>
		</div>
	)
}

function Tips() {
	return (
		<details className="mt-6 group">
			<summary className="cursor-pointer select-none text-sm text-gray-700 flex items-center gap-2">
				<span className="group-open:rotate-90 transition">▶</span>
				Helpful notes
			</summary>
			<ul className="list-disc pl-6 mt-3 text-sm text-gray-700 space-y-1">
				<li>
					The API you shared supports both <code>multipart/form-data</code>{' '}
					(used here) and <code>application/json</code> (send{' '}
					<code>{`{ key, contentType }`}</code> if you already know them).
				</li>
				<li>
					S3 may return <code>200</code> or <code>204</code> on success. This
					component treats any 2xx as success.
				</li>
				<li>
					To attach metadata to the object, add <code>Metadata</code> on the
					server's <code>PutObjectCommand</code>
					and include matching <code>x-amz-meta-*</code> headers when doing the
					PUT.
				</li>
			</ul>
		</details>
	)
}

async function safeJson(res: Response): Promise<any | null> {
	try {
		return await res.json()
	} catch {
		return null
	}
}

function putWithProgress(
	url: string,
	file: File,
	contentType: string,
	onProgress: (pct: number) => void
) {
	return new Promise<void>((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		xhr.upload.onprogress = (evt) => {
			if (!evt.lengthComputable) return
			const pct = (evt.loaded / evt.total) * 100
			onProgress(pct)
		}

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				onProgress(100)
				resolve()
			} else {
				reject(new Error(`S3 PUT failed (${xhr.status})`))
			}
		}

		xhr.onerror = () => reject(new Error('Network error during S3 PUT'))

		xhr.open('PUT', url, true)
		xhr.setRequestHeader(
			'Content-Type',
			contentType || 'application/octet-stream'
		)
		xhr.send(file)
	})
}
