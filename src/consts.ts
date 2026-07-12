// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "CY's Notebook";
export const SITE_DESCRIPTION =
	'A public notebook — life in Japan, open source, career, and tech. Written mainly for myself, to keep learning and to remember.';

// The five content categories. Every post belongs to exactly one;
// free-form tags are separate (see the `tags` field in the blog schema).
export const CATEGORIES = ['life', 'japan', 'opensource', 'career', 'tech'] as const;
export type Category = (typeof CATEGORIES)[number];

// Locales a post can be translated into. A post folder holds one file per
// version: index.md (the default) plus optional <locale>.md translations.
export const LANGUAGES = ['zh-tw', 'en', 'ja'] as const;
export type Language = (typeof LANGUAGES)[number];

// The default locale lives at unprefixed URLs; the others get /<locale>/ sections.
export const DEFAULT_LOCALE: Language = 'en';
export const PREFIXED_LOCALES = LANGUAGES.filter((lang) => lang !== DEFAULT_LOCALE);

// Human-readable labels, the <html lang> value, and the note shown when a
// locale page falls back to default-language content.
export const LANGUAGE_INFO: Record<
	Language,
	{ label: string; htmlLang: string; untranslatedNote?: string }
> = {
	'zh-tw': {
		label: '中文',
		htmlLang: 'zh-Hant-TW',
		untranslatedNote: '此文章尚未有中文版，以下顯示原文。',
	},
	en: { label: 'English', htmlLang: 'en' },
	ja: {
		label: '日本語',
		htmlLang: 'ja',
		untranslatedNote: 'この記事はまだ日本語に翻訳されていません。原文を表示しています。',
	},
};

// Prefix a root-relative path with the configured `base` so links work when
// the site is served from a subpath (e.g. https://user.github.io/cy-blog/).
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}

// The locale section of the current page, e.g. '/zh-tw' on /zh-tw/blog/.
// Empty string on default-language (unprefixed) pages.
export function localePrefix(pathname: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const firstSegment = pathname.replace(base, '').split('/').filter(Boolean)[0];
	return (LANGUAGES as readonly string[]).includes(firstSegment) ? `/${firstSegment}` : '';
}
