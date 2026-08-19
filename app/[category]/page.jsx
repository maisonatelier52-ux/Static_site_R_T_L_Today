import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ui/ArticleCard';
import { categories, getArticlesByCategory } from '@/lib/data';

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const entry = categories.find((item) => item.slug === category);
  if (!entry) return {};
  return {
    title: `${entry.label} News`,
    description: `Latest ${entry.label.toLowerCase()} news, features and analysis from RTL Today.`,
    alternates: { canonical: `/${category}` }
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryInfo = categories.find((item) => item.slug === category);
  const categoryArticles = getArticlesByCategory(category);
  if (!categoryInfo || !categoryArticles.length) notFound();

  return (
    <div className="w-[min(1100px,calc(100%-40px))] max-[900px]:w-[min(100%-28px,1100px)] max-[430px]:w-[calc(100%-24px)] mx-auto pb-[70px]">
      <header className="relative pt-[58px] max-[720px]:pt-10 pb-[30px] border-b-[6px] border-ink overflow-hidden after:content-[''] after:absolute after:-right-2.5 after:-bottom-[45px] after:w-[230px] max-[720px]:after:w-[110px] after:h-[130px] after:bg-brand after:-skew-y-0 after:[transform:skew(-26deg)] after:-z-10">
        <div className="flex gap-2.5 text-[9px] font-extrabold uppercase tracking-[0.16em]">
          <Link href="/" className="text-brand hover:underline">Home</Link>
          <span className="before:content-['/'] before:mr-2.5 before:text-muted text-muted">{categoryInfo.label}</span>
        </div>
        <h1 className="text-[58px] max-[720px]:text-[58px] md:text-[96px] tracking-[-0.075em] leading-[0.9] my-2.5 mb-[15px]" style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}>
          {categoryInfo.label}
        </h1>
        <p className="max-w-[520px] text-muted text-sm">
          Latest reporting, useful context and fresh perspectives from our newsroom.
        </p>
      </header>

      <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1 gap-x-5 gap-y-9 pt-7">
        {categoryArticles.map((article, index) => (
          <ArticleCard
            article={article}
            key={article.id}
            variant={index === 0 ? 'newsGridLead' : 'newsGridCard'}
            priority={index === 0}
            className={index === 0 ? 'col-span-2 max-[520px]:col-span-1' : ''}
          />
        ))}
      </div>
    </div>
  );
}