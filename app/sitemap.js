import { articles, authors, categories } from '@/lib/data';

export default function sitemap() {
  const base = 'https://rtltoday.example';
  return [
    { url: base, lastModified: new Date() },
    ...categories.map(({ slug }) => ({ url: `${base}/${slug}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${base}/${article.category}/${article.slug}`, lastModified: new Date(article.publishedAt) })),
    ...authors.map((author) => ({ url: `${base}/author/${author.id}`, lastModified: new Date() }))
  ];
}
