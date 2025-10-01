const BASE = 'https://jsonplaceholder.typicode.com'

type FetchOpts = { next?: NextFetchRequestConfig; cache?: RequestCache }

/** SERVER-friendly fetch (можно прокидывать revalidate/next/cache) */
export async function api<T>(path: string, opts: FetchOpts = {}): Promise<T> {
	const res = await fetch(`${BASE}${path}`, {
		headers: { 'Content-Type': 'application/json' },
		...opts,
	})
	if (!res.ok) throw new Error(`API ${path} failed with ${res.status}`)
	return res.json()
}

/** CLIENT-friendly fetch (используй в React Query) */
export async function apiClient<T>(path: string): Promise<T> {
	const res = await fetch(`${BASE}${path}`, {
		headers: { 'Content-Type': 'application/json' },
	})
	if (!res.ok) throw new Error(`API ${path} failed with ${res.status}`)
	return res.json()
}

/** доменные функции */
export type Post = { id: number; userId: number; title: string; body: string }
export type User = { id: number; name: string; username: string; email: string }

export const getPosts = (opts?: FetchOpts) => api<Post[]>('/posts', opts)
export const getPostById = (id: string, opts?: FetchOpts) =>
	api<Post>(`/posts/${id}`, opts)
export const getUsers = (opts?: FetchOpts) => api<User[]>('/users', opts)
