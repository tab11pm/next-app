'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
	const { theme, setTheme, systemTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const current = theme === 'system' ? systemTheme : theme
	const isDark = current === 'dark'

	return (
		<button
			aria-label="Toggle theme"
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className="btn-base  cursor-pointer border border-[rgb(var(--border))]"
		>
			{!mounted ? null : !isDark ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	)
}
