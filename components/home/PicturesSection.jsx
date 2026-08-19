import ArticleCard from '@/components/ui/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function PicturesSection({ articles }) {
  return (
    <section className="pt-9 pb-[22px] max-[720px]:pt-7 max-[720px]:pb-3.5">
      <SectionHeader title="Pictures" />
      <div className="grid grid-cols-4 max-[720px]:grid-cols-2 gap-3 max-[720px]:gap-2.5">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard article={article} key={article.id} variant="picture" />
        ))}
      </div>
    </section>
  );
}
