import ArticleCard from '@/components/ui/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function EditorsPickSection({ articles }) {
  return (
    <section className="pt-9 pb-[42px] max-[720px]:pt-7">
      <SectionHeader title="Editor's Pick" />
      <div className="grid grid-cols-3 max-[720px]:grid-cols-1 gap-4">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard article={article} key={article.id} variant="standard" />
        ))}
      </div>
    </section>
  );
}
