import { type CollectionEntry, getCollection } from 'astro:content';
import { CATEGORIES, LANGUAGES, type Category, type Language } from '../consts';

export type Post = CollectionEntry<'blog'>;

// A translation is a <locale>.md file inside a post folder; its ID ends with
// the locale segment (e.g. "hello-world/zh-tw"). index.md is the default
// version and keeps the bare folder ID ("hello-world").
export function isTranslation(post: Post): boolean {
	const segments = post.id.split('/');
	return segments.length > 1 && (LANGUAGES as readonly string[]).includes(segments.at(-1)!);
}

// The language of a version: from the filename for translations,
// from frontmatter (default 'en') for the default version.
export function getPostLocale(post: Post): Language {
	const last = post.id.split('/').at(-1)!;
	return (LANGUAGES as readonly string[]).includes(last) ? (last as Language) : post.data.lang;
}

// Every published entry, including translations (for post pages).
export async function getAllPostEntries(): Promise<Post[]> {
	return (await getCollection('blog')).filter((post) => !post.data.draft);
}

// Default versions only, newest first — what lists, feeds, and counts use.
export async function getPosts(max?: number): Promise<Post[]> {
	return (await getAllPostEntries())
		.filter((post) => !isTranslation(post))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max);
}

// All versions of the post `post` belongs to, in LANGUAGES order.
export function getVersions(entries: Post[], post: Post): Post[] {
	const baseId = isTranslation(post) ? post.id.split('/').slice(0, -1).join('/') : post.id;
	return entries
		.filter((p) => p.id === baseId || LANGUAGES.some((l) => p.id === `${baseId}/${l}`))
		.sort((a, b) => LANGUAGES.indexOf(getPostLocale(a)) - LANGUAGES.indexOf(getPostLocale(b)));
}

// Categories that have at least one published post, in CATEGORIES order.
export async function getUsedCategories(): Promise<Category[]> {
	const posts = await getPosts();
	return CATEGORIES.filter((category) => posts.some((post) => post.data.category === category));
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
