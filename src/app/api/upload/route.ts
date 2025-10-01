import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// ⚠️ В Vercel файлы нельзя хранить постоянно (только tmp).
// Для реального проекта — лучше грузить в S3, Supabase, Cloudinary и т.п.

const s3 = new S3Client({
	region: process.env.YC_S3_REGION,
	endpoint: 'https://storage.yandexcloud.net',
	credentials: {
		accessKeyId: process.env.YC_S3_KEY_ID!,
		secretAccessKey: process.env.YC_S3_SECRET!,
	},
})

export const runtime = 'nodejs'

export async function POST(req: Request) {
	try {
		const formData = await req.formData()

		const title = formData.get('title')
		const file = formData.get('attachment')

		if (!title || typeof title !== 'string') {
			return NextResponse.json(
				{ error: 'Поле title обязательно' },
				{ status: 400 }
			)
		}

		if (!file || !(file instanceof File)) {
			return NextResponse.json({ error: 'Файл обязателен' }, { status: 400 })
		}

		// пример: читаем файл в буфер
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		// ⚠️ тут можно: сохранить во временную папку или в облако
		// например: fs.writeFileSync(`/tmp/${file.name}`, buffer);
		// fs.writeFileSync(`/tmp/${file.name}`, buffer);

		// 	const key = `uploads/${Date.now()}-${file.name}`;
		//  await s3.send(new PutObjectCommand({
		//    Bucket: process.env.YC_S3_BUCKET!,
		//    Key: key,
		//    Body: buffer,
		//    ContentType: file.type || "application/octet-stream",
		//    // ACL можно не задавать — по умолчанию приватно
		//  }));

		// Сформируем публичную ссылку, если бакет публичный, или просто вернём ключ
		// const publicUrl = `https://storage.yandexcloud.net/${process.env
		// 	.YC_S3_BUCKET!}/${encodeURIComponent(key)}`

		return NextResponse.json({
			success: true,
			title,
			filename: file.name,
			size: buffer.length,
		})
	} catch (err) {
		console.error(err)
		return NextResponse.json({ error: 'Ошибка при загрузке' }, { status: 500 })
	}
}
