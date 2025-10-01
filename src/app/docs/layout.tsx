import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem } from 'nextra'
import 'nextra-theme-docs/style.css'

export const metadata = {}

const navbar = <Navbar logo={<b>SSG</b>} />

// Оставляем только /docs и всё, что глубже
function filterToDocs(items: PageMapItem[]): PageMapItem[] {
	const deepFilter = (item: PageMapItem): PageMapItem | null => {
		// @ts-expect-error: разные kind имеют поле route/children по-разному
		const route: string | undefined = item.route
		// @ts-expect-error
		const children: PageMapItem[] | undefined = item.children

		const isDocs =
			typeof route === 'string' &&
			(route === '/docs' || route.startsWith('/docs/'))

		if (children && children.length) {
			const filteredChildren = children
				.map(deepFilter)
				.filter(Boolean) as PageMapItem[]
			if (filteredChildren.length) {
				// @ts-expect-error mutate children ok
				item.children = filteredChildren
				return item
			}
		}

		return isDocs ? item : null
	}

	return items.map(deepFilter).filter(Boolean) as PageMapItem[]
}
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const fullMap = await getPageMap()
	const docsOnlyMap = filterToDocs(fullMap)
	// const docsPageMap = await getPageMap('/docs') // <-- ключевая строка

	return (
		<Layout
			navbar={navbar}
			pageMap={docsOnlyMap}
			// footer={footer}
		>
			{children}
		</Layout>
	)
}
