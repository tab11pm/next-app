import { DOCPAGES } from '@/lib/consts/doc-pages'
import FeatureCard from '../ui/FeatureCard'

export default function MainDocPage() {
	return (
		<div className="grid md:grid-cols-2 gap-4 mt-4">
			{DOCPAGES.map(({ text, link, title }) => (
				<FeatureCard key={link} title={title} href={`docs/${link}`}>
					{text}
				</FeatureCard>
			))}
		</div>
	)
}
