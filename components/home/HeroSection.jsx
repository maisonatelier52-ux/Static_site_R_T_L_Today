// import ArticleCard from '@/components/ui/ArticleCard';
// import StickySidebar from '@/components/ui/StickySidebar';

// export default function HeroSection({ articles }) {
//   const [lead, ...rest] = articles;
//   return (
//     <section className="grid grid-cols-[minmax(0,3fr)_minmax(215px,1fr)] max-[900px]:grid-cols-[minmax(0,1fr)_210px] max-[720px]:block gap-5 items-start pt-9 pb-[22px] max-[720px]:pt-7 max-[720px]:pb-3.5">
//       <div>
        
//         <ArticleCard article={lead} variant="hero" priority />
//         <div className="grid grid-cols-3 max-[720px]:grid-cols-2 gap-3 max-[720px]:gap-[11px] mt-3.5">
//           {rest.slice(0, 3).map((article) => (
//             <ArticleCard article={article} key={article.id} variant="compact" />
//           ))}
//         </div>
//       </div>
//       <StickySidebar latest={articles.slice(1)} />
//     </section>
//   );
// }

import ArticleCard from '@/components/ui/ArticleCard';
import StickySidebar from '@/components/ui/StickySidebar';

// Index within the grid (i.e. after the lead/hero card) where a wide,
// two-column "featured" card breaks up the 3-column rhythm — mirrors
// the reference design (two full rows of 3, then one wide card).
const WIDE_CARD_INDEX = 6;

export default function HeroSection({ articles }) {
  const [lead, ...rest] = articles;
  return (
    <section className="grid grid-cols-[minmax(0,3fr)_minmax(215px,1fr)] max-[900px]:grid-cols-[minmax(0,1fr)_210px] max-[720px]:block gap-5 items-start pt-9 pb-[22px] max-[720px]:pt-7 max-[720px]:pb-3.5">
      <div>
        <ArticleCard article={lead} variant="hero" priority />
        <div className="grid grid-cols-3 max-[720px]:grid-cols-2 gap-3 max-[720px]:gap-[11px] mt-3.5">
          {rest.map((article, index) =>
            index === WIDE_CARD_INDEX ? (
              <ArticleCard article={article} key={article.id} variant="featureWide" badge="Live" />
            ) : (
              <ArticleCard article={article} key={article.id} variant="compact" />
            )
          )}
        </div>
      </div>
      <StickySidebar latest={articles.slice(1)} />
    </section>
  );
}