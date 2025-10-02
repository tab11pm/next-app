'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/Toast'
import { ModalRoot } from '@/components/ui/Modal'
import { ThemeProvider } from 'next-themes'
import { LoaderRoot } from '@/components/ui/Loader'

export function Providers({ children }: { children: ReactNode }) {
	const [qc] = useState(() => new QueryClient())
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
				<QueryClientProvider client={qc}>
					{children}
					{/* порталы */}
					<Toaster />
					<ModalRoot />
					<LoaderRoot />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	)
}
