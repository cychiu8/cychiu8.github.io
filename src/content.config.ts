import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, LANGUAGES } from './consts';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Exactly one of the five categories: life, japan, opensource, career, tech
			category: z.enum(CATEGORIES),
			// Free-form tags, e.g. ['kafka', 'tokyo', 'reading']
			tags: z.array(z.string()).default([]),
			// The language this post is written in: zh-tw, en, or ja
			lang: z.enum(LANGUAGES).default('en'),
			// Draft posts are excluded from lists, feeds, and search.
			draft: z.boolean().default(false),
		}),
});

// Standalone page content (home intro, about) editable as markdown.
const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
	}),
});

export const collections = { blog, pages };
