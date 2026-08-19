import ArticleCard from '@/components/ui/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function CategoryFeatureSection({ title, slug, articles }) {
  if (!articles.length) return null;
  return (
    <section className="pt-9 pb-[22px] max-[720px]:pt-7 max-[720px]:pb-3.5">
      <SectionHeader title={title} href={`/${slug}`} />
      <div className="grid grid-cols-[2fr_1fr] max-[720px]:block gap-4">
        <ArticleCard article={articles[0]} variant="featureShort" />
        <div className="flex flex-col gap-3.5 max-[720px]:mt-5">
          {articles.slice(1, 4).map((article) => (
            <ArticleCard article={article} key={article.id} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}