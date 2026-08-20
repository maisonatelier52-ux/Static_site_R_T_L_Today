import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ui/ArticleCard';
import SocialIcons from '@/components/ui/SocialIcons';
import { authors, getArticlesByAuthor, getAuthor, getAuthorRole } from '@/lib/data';

export function generateStaticParams() {
  return authors.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} \u2013 ${getAuthorRole(author.id)}`,
    description: author.bio,
    alternates: { canonical: `/author/${slug}` }
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const authorArticles = getArticlesByAuthor(slug);
  const role = getAuthorRole(author.id);
  const initials = author.name.split(' ').map((part) => part[0]).join('');

  return (
    <div>
      <header
        className="text-white pt-[68px] pb-[68px] max-[720px]:pt-[42px] max-[720px]:pb-[42px] overflow-hidden"
        style={{
          background:
            'linear-gradient(110deg,#101216 0%,#101216 72%,#e30613 72%)'
        }}
      >
        <div className="w-[min(1100px,calc(100%-40px))] mx-auto grid grid-cols-[235px_minmax(0,1fr)_200px] max-[900px]:grid-cols-[190px_1fr] max-[720px]:grid-cols-[110px_1fr] max-[430px]:grid gap-[42px] max-[720px]:gap-6 items-center max-[720px]:items-start relative">
          <div
            className="relative aspect-[0.86] border-[8px] max-[720px]:border-4 border-white"
            style={{ boxShadow: '16px 16px 0 #e30613' }}
          >
            <Image
              src={author.profileImage}
              alt={author.name}
              fill
              priority
              sizes="280px"
              className="object-cover grayscale"
            />
          </div>
          <div className="max-[430px]:col-span-2">
            <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-extrabold uppercase tracking-[0.12em] mb-3">
              <Link href="/" className="text-brand hover:underline">Home</Link>
              <span className="normal-case font-semibold tracking-normal text-[#9aa0a6] before:content-['/'] before:mr-2.5 before:text-[#5b6066] before:font-extrabold before:uppercase before:tracking-[0.12em]">
                {author.name}
              </span>
            </div>
            <span className="text-brand text-[9px] font-extrabold tracking-[0.16em]">RTL TODAY JOURNALIST</span>
            <h1
              className="leading-[0.88] tracking-[-0.065em] my-2.5 mb-3.5 max-[720px]:text-[42px] max-[430px]:text-[36px]"
              style={{ fontSize: 'clamp(46px,7vw,78px)' }}
            >
              {author.name}
            </h1>
            <h2 className="text-[15px] max-[720px]:text-xs text-[#ff4954] mb-5">{role}</h2>
            <p className="text-[#c4c8cc] leading-[1.6] max-w-[540px] text-[13px]">{author.bio}</p>
            <div className="flex flex-wrap items-center gap-[15px] mt-[22px]">
              <SocialIcons social={author.social} website={author.websiteLink} size="w-8 h-8" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#c4c8cc]">
                {authorArticles.length} stories
              </span>
            </div>
          </div>
          <div className="text-[118px] font-black opacity-[.16] tracking-[-0.12em] max-[900px]:hidden">{initials}</div>
        </div>
      </header>
      <main className="w-[min(1100px,calc(100%-40px))] mx-auto pt-[70px] max-[720px]:pt-10 pb-20 max-w-[920px]">
        <div className="border-b-[5px] border-ink pb-[15px]">
          <span className="text-brand text-[8px] font-extrabold tracking-[0.15em]">RECENT WORK</span>
          <h2 className="text-[35px] max-[430px]:text-[28px] tracking-[-0.04em] mt-1.5">Stories by {author.name.split(' ')[0]}</h2>
        </div>
        <div className="flex flex-col">
          {authorArticles.map((article, index) => (
            <div className="grid grid-cols-[55px_1fr] max-[720px]:grid-cols-[28px_1fr] gap-[18px] max-[720px]:gap-2 py-6 border-b border-line" key={article.id}>
              <span className="text-brand text-xs font-extrabold pt-1">{String(index + 1).padStart(2, '0')}</span>
              <ArticleCard
                article={article}
                variant="horizontal"
                className="!border-0 !grid-cols-[235px_1fr] max-[720px]:!grid-cols-[40%_1fr] [&_h3]:!text-[22px] max-[720px]:[&_h3]:!text-[15px]"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}