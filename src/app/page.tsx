import Link from 'next/link'
import styles from '@/styles/main.module.css'
import RenderCard from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { PAGES } from '@/constants/PAGES'
import FeatureCard from '@/components/ui/FeatureCard'
import { FEATURECARDS } from '@/constants/FEATURECARDS'

export const metadata = {
	title: 'Next App — демо функционала',
	description:
		'Главная страница демо-приложения на Next: роутинг, SSG/SSR/ISR/CSR, работа с API, модальное окно с загрузкой файла и POST-запросом, страница Контакты.',
}
export default function Home() {
	return (
		<>
			<main className={styles.main}>
				{/* HERO */}
				<section className={styles.hero}>
					<div className={styles.heroLeft}>
						<h1>Next приложение — тестовое демо</h1>
						<p className={styles.lead}>
							За 1 неделю собран функционал: роутинг, 4 вида рендеринга (SSG /
							SSR / ISR(ICR) / CSR), работа с API, модальное окно (text + file)
							с отправкой <code>POST</code>, и страница{' '}
							<strong>Контакты</strong> с CRUD. Документация сделана на{' '}
							<strong>Nextra</strong>.
						</p>

						<div className={styles.badgesRow}>
							<Badge>Next App Router</Badge>
							<Badge>JSONPlaceholder</Badge>
							<Badge>Modal + POST</Badge>
							<Badge>LocalStorage</Badge>
							<Badge>S3 (доступ только с сайта)</Badge>
						</div>

						<div className={styles.heroCtas}>
							<Link className={styles.primaryBtn} href="/contacts">
								Открыть «Контакты»
							</Link>
							<Link className={styles.secondaryBtn} href="/docs">
								Документация (Nextra)
							</Link>
						</div>
					</div>

					<div className={styles.heroRight}>
						<div className={styles.heroPanel}>
							<h3>Кратко о проекте</h3>
							<ul>
								<li>Роутинг Next и четкая структура модулей.</li>
								<li>
									4 страницы с разными стратегиями рендеринга:{' '}
									<em>SSG / SSR / ISR(ICR) / CSR</em>.
								</li>
								<li>
									Работа с API: примеры на <code>jsonplaceholder</code>.
								</li>
								<li>
									Модальное окно: <code>text</code> + <code>file</code> с
									отправкой <code>POST</code>
									(при желании расширяется до WebSocket).
								</li>
								<li>
									<strong>Контакты:</strong> создать / изменить / удалить /
									смотреть; фото — в S3, приватный доступ (пока ссылки и
									метаданные в <code>localStorage</code> из-за отсутствия
									серверной части).
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* RENDERING GRID */}
				<section className={styles.section}>
					<h2>Рендеринг страниц</h2>
					<p className={styles.muted}>
						Каждая страница демонстрирует свою стратегию рендеринга и работу с
						данными.
					</p>
					<div className={styles.grid}>
						{PAGES.map(({ link, note, name }) => (
							<RenderCard key={link} mode={name} href={link} note={note} />
						))}
					</div>
				</section>

				{/* FEATURES */}
				<section className={styles.section}>
					<h2>Функциональные блоки</h2>
					<div className={styles.grid}>
						{FEATURECARDS.map(({ title, link, text }) => (
							<FeatureCard key={title} title={title} href={link}>
								{text}
							</FeatureCard>
						))}
					</div>
				</section>

				{/* ARCHITECTURE */}
				<section className={styles.section}>
					<h2>Архитектура проекта</h2>
					<div className={styles.arch}>
						<div>
							<h4>Слои и директории</h4>
							<ul>
								<li>
									<code>app/</code> — роутинг, страницы рендеринга и layout’ы.
								</li>
								<li>
									<code>common/</code> — базовые модели (напр., Contact).
								</li>
								<li>
									<code>features/</code> — модальное окно, загрузка файлов,
									формы.
								</li>
								<li>
									<code>ui/</code> — UI-компоненты и утилиты.
								</li>
							</ul>
						</div>
						<div>
							<h4>Стили</h4>
							<ul>
								<li>Минималистичный, чистый UI без тяжелых зависимостей.</li>
								<li>Адаптивная сетка, карточки, badge, кнопки.</li>
								<li>Легко заменить на Tailwind/SC, если потребуется.</li>
							</ul>
						</div>
						<div>
							<h4>Данные и приватность</h4>
							<ul>
								<li>Фото контактов в S3 с политикой ограниченного доступа.</li>
								<li>
									Промежуточное хранение ссылок/метаданных —{' '}
									<code>localStorage</code>.
								</li>
								<li>
									В проде это уедет в серверную часть (API + подписанные URL).
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* FOOTER */}
				<footer className={styles.footer}>
					<div>© {new Date().getFullYear()} Next Demo</div>
					<nav className={styles.footerNav}>
						<Link href="/docs">Документация</Link>
						<Link href="/contacts">Контакты</Link>
						<Link href="/contacts">Модальное окно</Link>
					</nav>
				</footer>
			</main>
		</>
	)
}
