import { RenderMode } from '@/types/pages.type'

type PagesType = {
	note: string
	link: string
	name: RenderMode
}
export const PAGES: PagesType[] = [
	{
		name: 'SSG',
		link: '/docs',
		note: 'Статическая генерация контента (Nextra-дока тоже SSG).',
	},
	{
		name: 'CSR',
		link: '/contacts',
		note: 'Данные запрашиваются на клиенте.',
	},
	{
		name: 'SSR',
		link: '/users',
		note: 'Запрос к API выполняется на сервере при каждом запросе.',
	},
	{
		name: 'ISR (ICR)',
		link: '/blog',
		note: 'Страница регенерируется по времени/на спрос (incremental).',
	},
]
