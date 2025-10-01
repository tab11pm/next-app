import { Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem } from 'nextra'
import 'nextra-theme-docs/style.css'

export const metadata = {}

const navbar = <Navbar logo={<b>SSG</b>} />

type WithRoute = { route: string }
type WithChildren = { children: PageMapItem[] }

// узкий предикат без any
const hasRoute = (i: PageMapItem): i is PageMapItem & WithRoute =>
	typeof (i as Partial<WithRoute>).route === 'string'

// узкий предикат без any
const hasChildren = (i: PageMapItem): i is PageMapItem & WithChildren =>
	Array.isArray((i as Partial<WithChildren>).children)

function filterToDocs(items: PageMapItem[]): PageMapItem[] {
	const deepFilter = (item: PageMapItem): PageMapItem | null => {
		const isDocs =
			hasRoute(item) &&
			(item.route === '/docs' || item.route.startsWith('/docs/'))

		if (hasChildren(item) && item.children.length) {
			const filteredChildren = item.children
				.map(deepFilter)
				.filter((x): x is PageMapItem => x !== null)

			if (filteredChildren.length) {
				// создаём новый объект, не мутируя исходный; без any
				return { ...item, children: filteredChildren }
			}
		}

		return isDocs ? item : null
	}

	return items.map(deepFilter).filter((x): x is PageMapItem => x !== null)
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const fullMap = await getPageMap()
	const docsOnlyMap = filterToDocs(fullMap)
	// или просто: const docsOnlyMap = await getPageMap('/docs')

	return (
		<Layout navbar={navbar} pageMap={docsOnlyMap}>
			{children}
		</Layout>
	)
}
