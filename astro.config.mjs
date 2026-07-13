// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import { remarkReadingTime } from './src/utils/readTime.ts';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages: `site` is your GitHub Pages domain, `base` is the repo name.
	// If you ever rename the repo to <username>.github.io, delete the `base` line.
	site: 'https://cychiu8.github.io',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkReadingTime],
		shikiConfig: {
			// Dual themes: switched by the `.dark` class via CSS in global.css.
			themes: {
				light: 'vitesse-light',
				dark: 'material-theme-palenight',
			},
			wrap: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Manrope',
			cssVariable: '--font-manrope',
			weights: [400, 500, 600, 700, 800],
			fallbacks: ['sans-serif'],
		},
	],
});
