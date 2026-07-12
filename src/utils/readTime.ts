import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

// Injects `minutesRead` (e.g. "3 min read") into every post's frontmatter,
// readable via `remarkPluginFrontmatter` after render().
export function remarkReadingTime() {
	return function (tree: unknown, { data }: { data: { astro: { frontmatter: Record<string, unknown> } } }) {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		data.astro.frontmatter.minutesRead = readingTime.text;
	};
}
