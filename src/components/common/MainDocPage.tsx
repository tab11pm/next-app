import Item from '@/components/ui/Item'
import { DOCPAGES } from '@/lib/consts/doc-pages'
import Link from 'next/link'

export default function MainDocPage() {
	return (
		<div className="grid md:grid-cols-2 gap-4 mt-4">
			{DOCPAGES.map(({ text, link, title }) => (
				<Link key={link} href={'/docs' + link}>
					<Item title={title} text={text} />
				</Link>
			))}
		</div>
	)
}
