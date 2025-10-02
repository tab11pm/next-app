'use client'

import { Contact } from '@/types/contact.types'
import { useEffect, useState } from 'react'

export default function GetContactImg({ c }: { c: Contact }) {
	const [url, setUrl] = useState(
		`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
			c?.name
		)}` || 'https://api.dicebear.com/8.x/initials/svg?seed=Avatar'
	)
	const getImgFromS3 = async () => {
		const res = await fetch(`/api/s3/url?key=${encodeURIComponent(c?.key)}`)
		if (!res.ok) {
			throw new Error('Error when get url ' + res.status)
		}

		setUrl((await res.json()).url)
	}

	useEffect(() => {
		if (c?.key) getImgFromS3()
	}, [])

	return (
		<>
			<img
				src={url}
				alt={c?.name || ''}
				className="h-14 w-14 flex-none rounded-2xl object-cover"
				width={100}
				height={100}
			/>
		</>
	)
}
