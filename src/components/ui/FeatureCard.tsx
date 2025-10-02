import styles from '@/styles/main.module.css'
import Link from 'next/link'
export default function FeatureCard({
	title,
	children,
	href,
	cta = 'Открыть',
}: {
	title: string
	children: React.ReactNode
	href?: string
	cta?: string
}) {
	return (
		<div className={styles.card}>
			<h3>{title}</h3>
			<p>{children}</p>
			{href && (
				<Link className={styles.cta} href={href}>
					{cta} →
				</Link>
			)}
		</div>
	)
}
