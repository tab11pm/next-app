import { NextRequest, NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3 } from '@/lib/s3'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	const key = req.nextUrl.searchParams.get('key')
	if (!key) return NextResponse.json({ error: 'Missing ?key' }, { status: 400 })

	try {
		const url = await getSignedUrl(
			s3,
			new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key }),
			{ expiresIn: 60 } // сек
		)
		return NextResponse.json({ url })
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 })
	}
}
