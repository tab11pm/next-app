// scripts/s3-sanity.ts
// import 'dotenv/config'
// import { S3Client } from '@aws-sdk/client-s3'

// function must(name: string, v?: string) {
// 	if (!v) throw new Error(`Missing env ${name}`)
// 	return v
// }

// const REGION = must('S3_REGION', process.env.S3_REGION)
// const ENDPOINT = must('S3_ENDPOINT', process.env.S3_ENDPOINT)
// const BUCKET = must('S3_BUCKET', process.env.S3_BUCKET)
// const KEY_ID_LAST4 = process.env.S3_ACCESS_KEY_ID?.slice(-4)

// console.log('ENV CHECK =>', { REGION, ENDPOINT, BUCKET, KEY_ID_LAST4 })

// const s3 = new S3Client({
// 	region: REGION, // ← без этого была твоя ошибка
// 	endpoint: ENDPOINT, // https://s3.cloud.ru (без точки в конце)
// 	forcePathStyle: (process.env.S3_FORCE_PATH_STYLE ?? 'true') === 'true',
// 	credentials: {
// 		accessKeyId: must('S3_ACCESS_KEY_ID', process.env.S3_ACCESS_KEY_ID),
// 		secretAccessKey: must(
// 			'S3_SECRET_ACCESS_KEY',
// 			process.env.S3_SECRET_ACCESS_KEY
// 		),
// 	},
// })

// ;(async () => {
// 	try {
// 		const a = await s3.send(new ListBucketsCommand({}))
// 		console.log(
// 			'Buckets:',
// 			a.Buckets?.map((b) => b?.Name)
// 		)

// 		const b = await s3.send(new GetBucketLocationCommand({ Bucket: BUCKET }))
// 		console.log('BucketLocation:', b.LocationConstraint)
// 	} catch (e: any) {
// 		console.error('Auth/Endpoint error:', e.Code || e.name, e.message)
// 		process.exit(1)
// 	}
// })()
