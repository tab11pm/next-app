import { ReactNode } from 'react'

export default function Title({ children }: { children: string | ReactNode }) {
	return (
		<>
			<span className="bg-gradient-to-r from-red-600 to-blue-400 bg-clip-text text-transparent">
				{children}
			</span>
		</>
	)
}
