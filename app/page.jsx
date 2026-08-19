

import HeroSection from '@/components/home/HeroSection';
import LatestSection from '@/components/home/LatestSection';
import HighlightsSection from '@/components/home/HighlightsSection';
import LifeSection from '@/components/home/LifeSection';
import EditorsPickSection from '@/components/home/EditorsPickSection';
import PromoBand from '@/components/home/PromoBand';
import CategoryFeatureSection from '@/components/home/CategoryFeatureSection';
import PicturesSection from '@/components/home/PicturesSection';
import ExploreSection from '@/components/home/ExploreSection';
import { articles, getArticlesByCategory } from '@/lib/data';

export const metadata = {
  title: 'Latest Luxembourg & World News',
  alternates: { canonical: '/' }
};

export default function HomePage() {
  const latest = articles;
  const highlights = articles.filter((article) => article.featured);
  const editors = articles.filter((article) => article.editorPick);

  return (
    <>
      <div className="w-[min(1100px,calc(100%-40px))] max-[900px]:w-[min(100%-28px,1100px)] max-[430px]:w-[calc(100%-24px)] mx-auto">
        <HeroSection articles={latest.slice(0, 18)} />
        <LatestSection articles={latest.slice(4, 13)} />
        <HighlightsSection articles={highlights} />
        <LifeSection articles={getArticlesByCategory('luxembourg-life').concat(getArticlesByCategory('culture'))} />
        <EditorsPickSection articles={editors} />
      </div>
      <PromoBand />
      <div className="w-[min(1100px,calc(100%-40px))] max-[900px]:w-[min(100%-28px,1100px)] max-[430px]:w-[calc(100%-24px)] mx-auto">
        <CategoryFeatureSection title="World" slug="world" articles={getArticlesByCategory('world').concat(getArticlesByCategory('business'))} />
        <PicturesSection articles={latest.slice(2, 8)} />
        <ExploreSection articles={latest.slice(8, 14)} />
        <CategoryFeatureSection title="Sport" slug="sport" articles={getArticlesByCategory('sport').concat(getArticlesByCategory('science'))} />
      </div>
    </>
  );
}
