import { type CollectionEntry, getCollection } from 'astro:content';
import { CATEGORIES, type Category } from '../consts';

export type Post = CollectionEntry<'blog'>;

// All non-draft posts, newest first.
export async function getPosts(max?: number): Promise<Post[]> {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max);
}

// Categories that have at least one published post, in CATEGORIES order.
export async function getUsedCategories(): Promise<Category[]> {
	const posts = await getPosts();
	return CATEGORIES.filter((category) => posts.some((post) => post.data.tags.includes(category)));
}

// Up to `max` other posts sharing at least one tag with `post`.
export function getRelatedPosts(posts: Post[], post: Post, max = 3): Post[] {
	return posts
		.filter((p) => p.id !== post.id && p.data.tags.some((tag) => post.data.tags.includes(tag)))
		.slice(0, max);
}
