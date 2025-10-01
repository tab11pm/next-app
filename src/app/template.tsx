'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function Template({ children }: { children: ReactNode }) {
	const pathname = usePathname()
	const reduce = useReducedMotion()

	const variants = {
		initial: { opacity: 0, y: reduce ? 0 : 6 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: reduce ? 0 : -6 },
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={variants}
				transition={{ duration: 0.16, ease: 'easeOut' }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
