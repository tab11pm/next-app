import styles from '@/styles/main.module.css'

export default function Badge({ children }: { children: React.ReactNode }) {
	return <span className={styles.badge}>{children}</span>
}
