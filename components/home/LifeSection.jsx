import ArticleCard from '@/components/ui/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function LifeSection({ articles }) {
  const [lead, ...rest] = articles.slice(0, 5);
  return (
    <section className="pt-9 pb-[22px] max-[720px]:pt-7 max-[720px]:pb-3.5">
      <SectionHeader title="Health" href="/health" />
      <div className="grid grid-cols-[1.4fr_1fr] max-[720px]:grid-cols-1 gap-4">
        <ArticleCard article={lead} variant="feature" />
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-4 content-start">
          {rest.map((article) => (
            <ArticleCard article={article} key={article.id} variant="thumb" />
          ))}
        </div>
      </div>
    </section>
  );
}