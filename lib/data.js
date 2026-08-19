import articlesData from '../public/data/articles.json';
import authorsData from '../public/data/authors.json';

export const CATEGORY_LABELS = {
  luxembourg: 'Luxembourg',
  'luxembourg-life': 'Luxembourg Life',
  world: 'World',
  business: 'Business',
  culture: 'Culture',
  travel: 'Travel',
  sport: 'Sport',
  science: 'Science',
  technology: 'Technology'
};

function parseDate(str) {
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'section';
}

function buildSections(content = []) {
  const sections = [];
  const lead = [];
  let current = null;

  for (const block of content) {
    if (block.type === 'heading') {
      current = { id: slugifyHeading(block.text), heading: block.text, paragraphs: [] };
      sections.push(current);
    } else if (block.type === 'paragraph') {
      if (current) current.paragraphs.push(block.text);
      else lead.push(block.text);
    }
  }

  const intro = lead[0] || sections[0]?.paragraphs?.[0] || '';
  if (lead.length > 1) {
    sections.unshift({ id: 'overview', heading: 'Overview', paragraphs: lead.slice(1) });
  }

  return { intro, sections };
}

function normalize(article, category) {
  const { intro, sections } = buildSections(article.content);
  return {
    ...article,
    category,
    categoryLabel: CATEGORY_LABELS[category] || category,
    publishedAt: parseDate(article.date).toISOString(),
    intro,
    sections
  };
}

const rawArticles = Object.entries(articlesData).flatMap(([category, list]) =>
  (Array.isArray(list) ? list : [])
    .filter((article) => article.isPublished === 'true' || article.isPublished === true)
    .map((article) => normalize(article, category))
);

export const articles = [...rawArticles].sort(
  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
);

export const categories = Object.keys(articlesData).map((slug) => ({
  slug,
  label: CATEGORY_LABELS[slug] || slug
}));

function getAuthorEntryByCategory(category) {
  return authorsData.categories.find((entry) => entry.category === category)?.author || null;
}

export const authors = [...new Map(
  authorsData.categories.map(({ author }) => [author.id, author])
).values()];

export function getArticle(category, slug) {
  return articles.find((article) => article.category === category && article.slug === slug);
}

export function getArticlesByCategory(category) {
  return articles.filter((article) => article.category === category);
}

export function getAuthor(id) {
  return authors.find((author) => author.id === id);
}

export function getArticlesByAuthor(id) {
  return articles.filter((article) => getAuthorEntryByCategory(article.category)?.id === id);
}

export function getAuthorForArticle(article) {
  return getAuthorEntryByCategory(article.category);
}

export function getAuthorCategories(id) {
  return authorsData.categories
    .filter((entry) => entry.author.id === id)
    .map((entry) => CATEGORY_LABELS[entry.category] || entry.category);
}

export function getAuthorRole(id) {
  const cats = getAuthorCategories(id);
  return cats.length ? `${cats[0]} Correspondent` : 'Correspondent';
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
}
