import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ui/ArticleCard';
import ShareButtons from '@/components/ui/ShareButtons';
import { articles, formatDate, getArticle, getAuthorForArticle, getArticlesByCategory } from '@/lib/data';

export function generateStaticParams() {
  return articles.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.keywords,
    alternates: { canonical: `/${category}/${slug}` },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      images: [article.image],
      publishedTime: article.publishedAt
    }
  };
}

function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'section';
}

// Pulls the first paragraph out of the content array to use as the bordered
// lead/intro, and returns the remaining blocks (headings, images, quotes,
// other paragraphs) in their original order for the body renderer. Heading
// blocks get a deduped `id` attached so they can be deep-linked from the
// "On this page" nav.
function splitLead(content = []) {
  const leadIndex = content.findIndex((block) => block.type === 'paragraph');
  const lead = leadIndex === -1 ? null : content[leadIndex];
  const remaining = leadIndex === -1 ? content : [...content.slice(0, leadIndex), ...content.slice(leadIndex + 1)];

  const seen = new Map();
  const rest = remaining.map((block) => {
    if (block.type !== 'heading') return block;
    const base = slugify(block.text);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    return { ...block, id };
  });

  return { lead, rest };
}

// Renders a single content block from article.content.
// Supported item.type values: "paragraph" | "heading" | "image" | "quote"
function renderContent(item, index) {
  const key = item.id ?? index;

  switch (item.type) {
    case 'paragraph':
      return (
        <p key={key} className="text-[#33393f] font-serif text-[16px] max-[720px]:text-base leading-[1.75] mb-4">
          {item.text}
        </p>
      );

    case 'heading': {
      const level = item.level === 3 ? 3 : 2;
      const Tag = `h${level}`;
      return (
        <Tag
          key={key}
          id={item.id}
          className={`scroll-mt-[170px] tracking-[-0.04em] leading-[1.1] mt-10 mb-4 max-[720px]:mt-8 ${
            level === 2 ? 'text-[31px] max-[720px]:text-[27px]' : 'text-[22px] max-[720px]:text-xl'
          }`}
        >
          {item.text}
        </Tag>
      );
    }

    case 'image':
      return (
        <figure key={key} className="my-8 max-[720px]:my-6">
          <div className="relative w-full aspect-[16/9] max-[720px]:aspect-[4/3] overflow-hidden bg-soft">
            <Image
              src={item.src}
              alt={item.alt || ''}
              fill
              sizes="(max-width: 720px) 100vw, 650px"
              className="object-cover"
            />
          </div>
          {item.caption && (
            <figcaption className="text-[11px] text-muted mt-2 leading-[1.4]">{item.caption}</figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote
          key={key}
          className="my-[34px] p-[30px] max-[430px]:p-[22px] bg-soft border-t-4 border-ink font-serif font-bold text-[23px] max-[430px]:text-xl leading-[1.35] tracking-[-0.02em]"
        >
          &ldquo;{item.text}&rdquo;
          {item.author && (
            <footer className="mt-3 text-[13px] font-sans font-extrabold tracking-[0.02em] not-italic">
              — {item.author}
            </footer>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();
  const author = getAuthorForArticle(article);
  const related = getArticlesByCategory(article.category).filter((item) => item.id !== article.id).slice(0, 3);
  const { lead, rest } = splitLead(article.content);
  const headings = rest.filter((item) => item.type === 'heading');
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: [article.image],
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: author?.name },
    publisher: { '@type': 'Organization', name: 'RTL Today' }
  };

  return (
    <article className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header className="bg-[#0e1014] text-white pt-[58px] max-[720px]:pt-[38px] pb-[125px] max-[720px]:pb-20">
        <div className="w-[min(1100px,calc(100%-40px))] max-[900px]:w-[calc(100%-80px)] max-[720px]:!max-w-none mx-auto max-w-[910px]">
         <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-extrabold uppercase tracking-[0.12em]">
          <Link href="/" className="text-[#ff3140] hover:underline">Home</Link>
          <Link
            href={`/${article.category}`}
            className="text-[#ff3140] hover:underline before:content-['/'] before:mr-2.5 before:text-[#737980]"
          >
            {article.categoryLabel}
          </Link>
          <span className="normal-case font-semibold tracking-normal text-[#9aa0a6] truncate max-w-[380px] max-[720px]:max-w-[200px] before:content-['/'] before:mr-2.5 before:text-[#737980] before:font-extrabold before:uppercase before:tracking-[0.12em]">
            {article.title}
          </span>
        </div>
          <h1
            className="leading-[0.97] tracking-[-0.06em] my-[18px] max-w-[950px] max-[720px]:text-[42px] max-[430px]:text-[38px]"
            style={{ fontSize: 'clamp(40px, 6.2vw, 72px)' }}
          >
            {article.title}
          </h1>
          <p className="text-[#c5c9cd] text-[15px] max-[720px]:text-[12px] leading-[1.45] max-w-[720px]">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-[11px] mt-7 max-[430px]:mt-5 text-[11px]">
            {author && (
              <>
                <Link href={`/author/${author.id}`}>
                  <Image
                    src={author.profileImage}
                    width={48}
                    height={48}
                    alt={author.name}
                    className="row-span-2 h-[50px] w-[50px] rounded-full grayscale-[30%]"
                  />
                </Link>
                <div>
                 By{" "}
                  <Link
                    href={`/author/${author.id}`}
                    className="font-extrabold transition-transform duration-300 hover:text-red-600 hover:scale-80 inline-block"
                  >
                    {author.name}
                  </Link>
                  <span className="block text-[#949aa0] text-[9px] mt-1">
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> &middot; {article.readTime}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="w-[min(1100px,calc(100%-40px))] mx-auto relative max-w-[1100px] aspect-[16/8.4] max-[720px]:w-full max-[720px]:aspect-[1.25/1] max-[430px]:aspect-[1.1/1] -mt-[84px] max-[720px]:-mt-[42px] border-[8px] max-[720px]:border-0 border-white">
        <Image
          src={article.image}
          alt={article.imageAlt || article.title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 1100px"
          className="object-cover"
        />
      </div>

      <div className="w-[min(1100px,calc(100%-40px))] mx-auto grid grid-cols-[60px_minmax(0,650px)_minmax(220px,270px)] max-[900px]:grid-cols-[minmax(0,620px)_235px] max-[720px]:flex max-[720px]:flex-col justify-center gap-[42px] max-[900px]:gap-7 pt-[50px] max-[720px]:pt-[30px] items-start">
        <aside className="sticky top-[170px] max-[900px]:hidden" aria-label="Article tools">
          <ShareButtons title={article.title} />
        </aside>

        <div className="max-[720px]:order-2">
          {lead && (
            <div className="font-serif font-bold text-[18px] max-[720px]:text-xl leading-[1.42] tracking-[-0.02em] border-l-[5px] border-brand pl-5 mb-[46px]">
              {lead.text}
            </div>
          )}

          <div>
            {rest.map((item, index) => renderContent(item, index))}
          </div>

          <div className="border-t border-line flex flex-wrap gap-2 items-center pt-[18px] text-[10px]">
            <span className="font-extrabold mr-[5px]">Topics</span>
            {article.keywords?.slice(0, 5).map((keyword) => (
              <span key={keyword} className="bg-soft px-2.5 py-[7px]">{keyword}</span>
            ))}
            <Link href={`/${article.category}`} className="bg-soft px-2.5 py-[7px] hover:text-brand">{article.categoryLabel}</Link>
            <Link href="/world" className="bg-soft px-2.5 py-[7px] hover:text-brand">Latest news</Link>
          </div>
        </div>

        <aside className="max-[720px]:order-1 relative max-[720px]:w-full self-stretch">
          <div className="sticky top-[168px] max-[720px]:static flex flex-col gap-[22px]">
            {headings.length > 0 && (
              <nav className="border-t-[3px] border-ink pt-[13px]" aria-label="Table of contents">
                <span className="text-[8px] tracking-[0.14em] font-extrabold text-ink">ON THIS PAGE</span>
                {headings.map((heading, index) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="grid grid-cols-[27px_1fr] gap-[5px] py-[11px] border-b border-line text-[12px] max-[720px]:text-[11px] leading-[1.3] hover:text-brand [&>b]:text-brand"
                  >
                    <b>0{index + 1}</b>{heading.text}
                  </a>
                ))}
              </nav>
            )}
           
            {/* Ad slot — replace inner content with your ad unit / script */}
            <div className="bg-soft border border-line flex flex-col items-center justify-center gap-2 min-h-[450px] w-full">
              <span className="text-[8px] font-extrabold tracking-[0.14em] text-muted uppercase">Advertisement</span>
              <div className="w-full h-full flex items-center justify-center text-[11px] text-muted">
                300 × 450
              </div>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="w-[min(1100px,calc(100%-40px))] mx-auto pt-[90px] max-[720px]:pt-[55px] pb-20">
          <div className="border-t-[6px] border-ink py-3.5 pb-[18px]">
            <span className="text-brand text-[8px] font-extrabold tracking-[0.15em]">KEEP READING</span>
            <h2 className="text-[32px] mt-1 tracking-[-0.04em]">More from {article.categoryLabel}</h2>
          </div>
          <div className="grid grid-cols-3 max-[720px]:grid-cols-1 gap-4">
            {related.map((item) => (
              <ArticleCard article={item} key={item.id} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}