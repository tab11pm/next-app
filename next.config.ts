// next.config.ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import { mdxOptions } from './lib/mdx-options'

const nextConfig: NextConfig = {
	basePath: '/ssg',
	experimental: { mdxRs: true },
}

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: mdxOptions,
})

export default withMDX(nextConfig)
