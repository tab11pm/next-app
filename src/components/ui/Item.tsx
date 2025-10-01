type ItemProps = {
	title: string
	text: string
}
export default function Item({ title, text }: ItemProps) {
	return (
		<>
			<div className="py-8 px-4 shadow shadow-gray-50 rounded-md">
				<h3 className="text-xl font-semibold mb-2">{title}</h3>
				<p>{text}</p>
			</div>
		</>
	)
}
