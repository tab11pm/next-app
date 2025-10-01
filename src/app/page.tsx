import { OpenCreatePostModalButton } from '@/components/features/create-post/OpenCreatePostModalButton'

export default function Home() {
	return (
		<>
			<section className="container-prose">
				<h1 className="text-2xl font-bold mb-4">
					Готово: конфиги + UI заготовки
				</h1>
				<p>Проверь шапку/подвал, кнопки, инпуты, модалку и тосты.</p>
				<div className="mt-6">
					<OpenCreatePostModalButton />
				</div>
			</section>
		</>
	)
}
