import { NextRequest, NextResponse } from 'next/server'
import { s3 } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
	// поддерживаем и FormData, и JSON на всякий случай
	const ct = req.headers.get('content-type') || ''
	let file: File | null = null
	let keyFromBody: string | undefined
	let contentTypeFromBody: string | undefined

	if (ct.includes('multipart/form-data')) {
		const form = await req.formData()
		const f = form.get('attachment')
		if (f instanceof File) file = f
	} else if (ct.includes('application/json')) {
		const { key, contentType } = await req.json().catch(() => ({}))
		keyFromBody = key
		contentTypeFromBody = contentType
	}

	const bucket = process.env.S3_BUCKET!
	// если пришёл файл — генерим key сами; если JSON — используем присланный
	const key =
		keyFromBody ??
		`uploads/${crypto.randomUUID()}-${(file as File | null)?.name ?? 'blob'}`

	const contentType =
		contentTypeFromBody ??
		(file?.type && file.type !== '' ? file.type : 'application/octet-stream')

	try {
		// presigned PUT: клиент потом сделает PUT прямо в S3
		const url = await getSignedUrl(
			s3,
			new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				ContentType: contentType,
				// Если хотите протащить метаданные в S3:
				// Metadata: { title, description }  <- см. ниже как передать
			}),
			{ expiresIn: 60 } // сек
		)
		const res = await NextResponse.json({
			url,
			key,
			contentType,
			expiresIn: 60,
		})
		console.log(res)

		return res
	} catch (e: any) {
		return NextResponse.json(
			{ error: e.message ?? 'presign failed' },
			{ status: 500 }
		)
	}
}
