'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Title from '../ui/Title'

export function Header() {
	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="sticky top-0 z-50 border-b backdrop-blur"
		>
			<div className="flex h-14 items-center justify-between">
				<Title>
					<Link href="/" className="font-semibold">
						<Image alt="" src="/next.svg" width={100} height={100} />
					</Link>
				</Title>
				<nav className="flex gap-4 text-sm">
					<Link href="/docs">SSG</Link>
					<Link href="/blog">ISR</Link>
					<Link href="/users">SSR</Link>
					<Link href="/client">CSR</Link>
				</nav>
				<ThemeToggle />
			</div>
		</motion.header>
	)
}
