import ArticleCard from '@/components/ui/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function LatestSection({ articles }) {
  return (
    <section className="pt-9 pb-[22px] max-[720px]:pt-7 max-[720px]:pb-3.5">
      <SectionHeader title="Latest" href="/world" eyebrow="Updated moments ago" />
      <div className="grid grid-cols-3 max-[720px]:grid-cols-2 max-[430px]:grid-cols-2 gap-x-3.5 gap-y-[22px]">
        {articles.slice(0, 8).map((article, index) => (
          <ArticleCard article={article} key={article.id} variant={index === 3 ? 'overlayWide' : 'standard'} />
        ))}
      </div>
    </section>
  );
}