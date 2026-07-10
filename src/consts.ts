// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "CY's Notebook";
export const SITE_DESCRIPTION =
	'A public notebook — life in Japan, open source, career, and tech. Written mainly for myself, to keep learning and to remember.';

// The five content categories. Every post picks one or more of these as tags.
export const CATEGORIES = ['life', 'japan', 'opensource', 'career', 'tech'] as const;
export type Category = (typeof CATEGORIES)[number];

// Each post is written in exactly one language.
export const LANGUAGES = ['zh-tw', 'en', 'ja'] as const;
export type Language = (typeof LANGUAGES)[number];

// Human-readable labels and the value for the <html lang> attribute.
export const LANGUAGE_INFO: Record<Language, { label: string; htmlLang: string }> = {
	'zh-tw': { label: '中文', htmlLang: 'zh-Hant-TW' },
	en: { label: 'English', htmlLang: 'en' },
	ja: { label: '日本語', htmlLang: 'ja' },
};

// Prefix a root-relative path with the configured `base` so links work when
// the site is served from a subpath (e.g. https://user.github.io/cy-blog/).
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}
