// lib/mdx-options.ts
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

export const mdxOptions = {
	remarkPlugins: [remarkGfm],
	rehypePlugins: [[rehypePrettyCode, { keepBackground: false }]],
}
