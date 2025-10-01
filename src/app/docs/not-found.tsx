// src/app/docs/not-found.tsx
import Link from 'next/link'

export const dynamic = 'force-static'

export default function DocsNotFound() {
	return (
		<div className="mx-auto max-w-2xl py-16 px-6 text-center">
			<h1 className="text-3xl font-bold mb-3">Раздел не найден</h1>
			<p className="text-neutral-600 mb-6">
				Запрошенная страница документации отсутствует или была перемещена.
			</p>

			<div className="flex items-center justify-center gap-3">
				<Link
					href="/docs"
					className="rounded-xl border px-4 py-2 hover:bg-neutral-50"
				>
					← Вернуться к оглавлению
				</Link>
				<Link
					href="/docs/install"
					className="rounded-xl px-4 py-2 bg-black text-white hover:opacity-90"
				>
					Быстрый старт
				</Link>
			</div>

			<p className="mt-6 text-sm text-neutral-500">
				Нужного раздела нет? Проверьте структуру в сайдбаре или начните с&nbsp;
				<Link href="/docs/structure" className="underline">
					раздела «Структура»
				</Link>
				.
			</p>
		</div>
	)
}
