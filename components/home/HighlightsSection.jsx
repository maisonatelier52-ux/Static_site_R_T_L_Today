import ArticleCard from '@/components/ui/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HighlightsSection({ articles }) {
  return (
    <section className="pt-9 pb-[22px] mt-[34px] max-[720px]:pt-7 max-[720px]:pb-3.5">
      <SectionHeader title="Highlights" />
      <div className="grid grid-cols-3 max-[720px]:grid-cols-1 gap-4">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard article={article} key={article.id} variant="highlight" />
        ))}
      </div>
    </section>
  );
}
