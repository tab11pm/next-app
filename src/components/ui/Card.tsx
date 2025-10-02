import Link from 'next/link'
import styles from '@/styles/main.module.css'
import Badge from './Badge'
import { RenderMode } from '@/types/pages.type'

export default function RenderCard({
	mode,
	href,
	note,
}: {
	mode: RenderMode
	href: string
	note?: string
}) {
	return (
		<div className={styles.card}>
			<h3>
				Рендеринг: <Badge>{mode}</Badge>
			</h3>
			<p>
				Данные берутся с <code>jsonplaceholder</code> и отображаются на
				странице.
				{note ? <> {note}</> : null}
			</p>
			<Link className={styles.cta} href={href}>
				Перейти →
			</Link>
		</div>
	)
}
