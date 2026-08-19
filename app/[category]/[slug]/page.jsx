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

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();
  const author = getAuthorForArticle(article);
  const related = getArticlesByCategory(article.category).filter((item) => item.id !== article.id).slice(0, 3);
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
          <div className="flex gap-2.5 text-[9px] font-extrabold uppercase tracking-[0.12em]">
            <Link href={`/${article.category}`} className="text-[#ff3140]">{article.categoryLabel}</Link>
            <span className="before:content-['/'] before:mr-2.5 before:text-[#737980]">{article.newsType || 'In depth'}</span>
          </div>
          <h1
            className="leading-[0.97] tracking-[-0.06em] my-[18px] max-w-[950px] max-[720px]:text-[42px] max-[430px]:text-[38px]"
            style={{ fontSize: 'clamp(40px, 6.2vw, 72px)' }}
          >
            {article.title}
          </h1>
          <p className="text-[#c5c9cd] text-[17px] max-[720px]:text-[15px] leading-[1.45] max-w-[720px]">
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
                    className="rounded-full object-cover"
                  />
                </Link>
                <div>
                  By <Link href={`/author/${author.id}`} className="font-extrabold">{author.name}</Link>
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
          <div
            className="font-serif font-bold text-[22px] max-[720px]:text-xl leading-[1.42] tracking-[-0.02em] border-l-[5px] border-brand pl-5 mb-[46px]"
          >
            {article.intro}
          </div>

          {article.sections.map((section, index) => (
            <section id={section.id} key={section.id} className="scroll-mt-[170px] mb-[50px]">
              <span className="text-brand text-[10px] font-extrabold tracking-[0.12em]">0{index + 1}</span>
              <h2 className="text-[31px] max-[720px]:text-[27px] tracking-[-0.04em] leading-[1.1] my-1.5 mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-[#33393f] font-serif text-[17px] max-[720px]:text-base leading-[1.75] mb-4">
                  {paragraph}
                </p>
              ))}
              {index === 0 && (
                <blockquote className="my-[34px] p-[30px] max-[430px]:p-[22px] bg-soft border-t-4 border-ink font-serif font-bold text-[23px] max-[430px]:text-xl leading-[1.35] tracking-[-0.02em]">
                  &ldquo;Good local reporting should make a complex decision easier to understand.&rdquo;
                </blockquote>
              )}
            </section>
          ))}

          <div className="border-t border-line flex flex-wrap gap-2 items-center pt-[18px] text-[10px]">
            <span className="font-extrabold mr-[5px]">Topics</span>
            {article.keywords?.slice(0, 5).map((keyword) => (
              <span key={keyword} className="bg-soft px-2.5 py-[7px]">{keyword}</span>
            ))}
            <Link href={`/${article.category}`} className="bg-soft px-2.5 py-[7px] hover:text-brand">{article.categoryLabel}</Link>
            <Link href="/luxembourg" className="bg-soft px-2.5 py-[7px] hover:text-brand">Latest news</Link>
          </div>
        </div>

        <aside className="max-[720px]:order-1 relative max-[720px]:w-full">
          <div className="sticky top-[168px] max-[720px]:static flex flex-col max-[720px]:block gap-[22px]">
            {article.keyTakeaways?.length > 0 && (
              <div className="bg-[#f4f0ec] border-t-[5px] border-brand p-5">
                <span className="text-[8px] tracking-[0.14em] font-extrabold text-brand">THE BRIEF</span>
                <h2 className="font-serif font-bold text-[21px] leading-[1.1] my-1.5 mb-3.5">Key takeaways</h2>
                <ul className="list-none m-0 p-0">
                  {article.keyTakeaways.map((item) => (
                    <li key={item} className="relative pl-[19px] py-[9px] border-t border-[#d8d1ca] text-[11px] leading-[1.4] before:content-['\\2713'] before:absolute before:left-0 before:text-brand before:font-extrabold">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <nav className="border-t-[3px] border-ink pt-[13px] max-[720px]:mt-3.5" aria-label="Table of contents">
              <span className="text-[8px] tracking-[0.14em] font-extrabold text-ink">ON THIS PAGE</span>
              {article.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="grid grid-cols-[27px_1fr] gap-[5px] py-[11px] border-b border-line text-[10px] max-[720px]:text-[11px] leading-[1.3] hover:text-brand [&>b]:text-brand"
                >
                  <b>0{index + 1}</b>{section.heading}
                </a>
              ))}
            </nav>
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