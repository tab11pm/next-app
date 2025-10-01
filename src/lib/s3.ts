import {
	GetBucketCorsCommand,
	PutBucketCorsCommand,
	S3Client,
} from '@aws-sdk/client-s3'

const endpoint = process.env.S3_ENDPOINT!
const region = process.env.S3_REGION!
const forcePathStyle = (process.env.S3_FORCE_PATH_STYLE ?? 'false') === 'true'
console.log('S3_ACCESS_KEY_ID: ', process.env.S3_ACCESS_KEY_ID)

export const s3 = new S3Client({
	region,
	endpoint,
	forcePathStyle,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	},
})
