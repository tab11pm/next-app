import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '@/lib/s3'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest) {
	const bucket = process.env.S3_BUCKET!
	const key = req.nextUrl.searchParams.get('key')
	if (!key) return NextResponse.json({ error: 'Missing ?key' }, { status: 400 })

	// Защита по размеру
	const maxBytes = Number(process.env.MAX_UPLOAD_BYTES ?? 10 * 1024 * 1024)
	const contentLengthHeader = req.headers.get('content-length')
	if (!contentLengthHeader)
		return NextResponse.json(
			{ error: 'Missing Content-Length' },
			{ status: 411 }
		)
	const contentLength = Number(contentLengthHeader)
	if (Number.isNaN(contentLength) || contentLength > maxBytes) {
		return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
	}

	const contentType =
		req.headers.get('content-type') ?? 'application/octet-stream'
	const body = await req.arrayBuffer()

	try {
		await s3.send(
			new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				Body: Buffer.from(body),
				ContentType: contentType,

				// ACL: "private", // по умолчанию private
			})
		)

		return NextResponse.json({ ok: true, key })
	} catch (e: any) {
		return NextResponse.json(
			{ error: e.message ?? 'Upload failed' },
			{ status: 500 }
		)
	}
}
