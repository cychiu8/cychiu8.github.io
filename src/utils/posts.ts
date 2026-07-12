import { type CollectionEntry, getCollection } from 'astro:content';
import { CATEGORIES, LANGUAGES, type Category, type Language } from '../consts';

export type Post = CollectionEntry<'blog'>;

// All non-draft posts, newest first. Pass `lang` to keep one language only.
export async function getPosts(max?: number, lang?: Language): Promise<Post[]> {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.filter((post) => !lang || post.data.lang === lang)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max);
}

// Categories that have at least one published post (optionally in `lang`), in CATEGORIES order.
export async function getUsedCategories(lang?: Language): Promise<Category[]> {
	const posts = await getPosts(undefined, lang);
	return CATEGORIES.filter((category) => posts.some((post) => post.data.category === category));
}

// Languages that have at least one published post, in LANGUAGES order.
export async function getUsedLanguages(): Promise<Language[]> {
	const posts = await getPosts();
	return LANGUAGES.filter((lang) => posts.some((post) => post.data.lang === lang));
}

// Every tag used by a published post, with its post count, alphabetical.
export async function getUsedTags(): Promise<{ tag: string; count: number }[]> {
	const posts = await getPosts();
	const counts = new Map<string, number>();
	posts.forEach((post) => {
		post.data.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
	});
	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}

// Up to `max` other posts sharing a tag with `post`, topped up with
// posts from the same category when shared-tag matches run short.
export function getRelatedPosts(posts: Post[], post: Post, max = 3): Post[] {
	const others = posts.filter((p) => p.id !== post.id);
	const byTag = others.filter((p) => p.data.tags.some((tag) => post.data.tags.includes(tag)));
	const byCategory = others.filter(
		(p) => !byTag.includes(p) && p.data.category === post.data.category,
	);
	return [...byTag, ...byCategory].slice(0, max);
}
