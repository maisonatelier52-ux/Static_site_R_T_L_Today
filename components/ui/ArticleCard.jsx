
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/data';

const VARIANTS = {
  standard: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[16/9]',
    copy: 'pt-2.5',
    title: 'text-[16px] md:text-[18px]',
    showExcerpt: false,
    showMeta: true
  },
  hero: {
    wrap: 'min-w-0 group relative text-white',
    aspect: 'aspect-[1.18/1] md:aspect-[2/1]',
    copy: 'absolute inset-x-0 bottom-0 z-10 p-[18px] md:p-6',
    title: 'text-3xl md:text-[32px] max-w-[720px] my-[7px] leading-[1.08]',
    showExcerpt: true,
    excerptClass: 'hidden md:block text-[#e3e5e6] max-w-[620px] text-sm',
    showMeta: true,
    metaClass: 'text-[#d8dcdf]'
  },
  compact: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[16/9]',
    copy: 'pt-2.5',
    title: 'text-[16px]',
    showExcerpt: false,
    showMeta: false
  },
  wide: {
    wrap: 'min-w-0 group col-span-2',
    aspect: 'aspect-[2.05/1]',
    copy: 'pt-2.5',
    title: 'text-xl md:text-[22px]',
    showExcerpt: false,
    showMeta: true
  },
  featureWide: {
    wrap: 'min-w-0 group relative text-white col-span-2 md:col-span-2 max-[720px]:col-span-2',
    aspect: 'aspect-[2.05/1]',
    copy: 'absolute inset-x-0 bottom-0 z-10 p-4 md:p-5',
    title: 'text-xl md:text-[26px] max-w-[520px] my-[5px] leading-[1.12]',
    showExcerpt: false,
    showMeta: false,
    metaClass: 'text-[#d8dcdf]'
  },
  overlayWide: {
    wrap: 'min-w-0 group relative text-white col-span-2 md:col-span-2 max-[720px]:col-span-2',
    aspect: 'aspect-[2.05/1]',
    copy: 'absolute inset-x-0 bottom-0 z-10 p-4 md:p-5',
    title: 'text-md md:text-[24px] max-w-[560px] my-[5px] leading-[1.15]',
    showExcerpt: false,
    excerptClass: 'text-[#e3e5e6] max-w-[560px] text-[13px] mb-1.5',
    showMeta: true,
    metaClass: 'text-[#d8dcdf]'
  },
  feature: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[16/9]',
    copy: 'pt-2.5',
    title: 'text-xl md:text-[24px]',
    showExcerpt: true,
    excerptClass: 'text-[14px] text-[#525b64] mb-[9px] leading-[1.5]',
    showMeta: true
  },
  featureShort: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[2.1/1]',
    copy: 'pt-2.5',
    title: 'text-xl md:text-[24px]',
    showExcerpt: true,
    excerptClass: 'text-[14px] text-[#525b64] mb-[9px] leading-[1.5]',
    showMeta: true
  },
  thumb: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[16/9]',
    copy: 'pt-2',
    title: 'text-[14px] leading-[1.25]',
    showExcerpt: false,
    showMeta: true
  },
  horizontal: {
    wrap: 'min-w-0 group grid grid-cols-[42%_1fr] md:grid-cols-[44%_1fr] gap-[11px] md:gap-[13px] border-b border-line pb-3.5 items-stretch',
    aspect: 'aspect-[16/9]',
    fillHeight: true,
    copy: 'pt-0',
    title: 'text-[17px]',
    showExcerpt: false,
    showMeta: true
  },
  highlight: {
    wrap: 'min-w-0 group bg-soft',
    aspect: 'aspect-[16/9]',
    copy: 'px-3 pb-[13px] pt-[11px]',
    title: 'text-[16px] md:text-[18px]',
    showExcerpt: false,
    showMeta: true
  },
  picture: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[16/9]',
    copy: 'pt-2.5',
    title: 'text-[13px]',
    showExcerpt: false,
    showMeta: false,
    hideCategory: true
  },
  newsGridLead: {
    wrap: 'min-w-0 group relative text-white',
    aspect: 'aspect-[16/9]',
    copy: 'absolute inset-x-0 bottom-0 z-10 p-4 md:p-6',
    title: 'text-2xl md:text-[32px] font-bold max-w-[640px] my-2 leading-[1.12] tracking-[-0.02em]',
    showExcerpt: false,
    showMeta: false,
    categoryClass: 'text-white',
    pipeAccent: true
  },
  newsGridCard: {
    wrap: 'min-w-0 group',
    aspect: 'aspect-[16/9]',
    copy: 'pt-2.5',
    title: 'text-[15px] md:text-[16px] font-bold leading-[1.3] tracking-[-0.01em]',
    showExcerpt: false,
    showMeta: false,
    categoryClass: 'text-brand',
    pipeAccent: true
  }
};

export default function ArticleCard({ article, variant = 'standard', priority = false, className = '', badge = null }) {
  const v = VARIANTS[variant] || VARIANTS.standard;
  const href = `/${article.category}/${article.slug}`;
  const overlay = variant === 'hero' || variant === 'featureWide' || variant === 'overlayWide' || variant === 'newsGridLead';

  return (
    <article className={`${v.wrap} ${className}`.trim()}>
      <Link
        href={href}
        className={`relative block overflow-hidden bg-line ${v.fillHeight ? 'h-full min-h-[110px] md:min-h-[130px]' : ''}`}
        aria-label={article.title}
      >
        <div className={`relative w-full ${v.fillHeight ? 'h-full' : v.aspect}`}>
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            fill
            sizes={variant === 'hero' || variant === 'featureWide' || variant === 'overlayWide' || variant === 'newsGridLead' ? '(max-width: 800px) 100vw, 760px' : '(max-width: 720px) 100vw, 360px'}
            className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
            priority={priority}
          />
          {overlay && (
            <div
              className="absolute inset-0"
              style={{ backgroundImage: 'linear-gradient(180deg, transparent 38%, rgba(0,0,0,.88))' }}
            />
          )}
          {badge && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-brand text-white text-[10px] font-extrabold uppercase tracking-[0.06em] px-2 py-1">
              {badge}
            </span>
          )}
        </div>
      </Link>
      <div className={v.copy}>
        {!v.hideCategory && (
          <span
            className={`text-[11px] font-extrabold uppercase tracking-[0.08em] ${v.categoryClass || 'text-brand'} ${
              v.pipeAccent ? 'inline-flex items-center gap-1.5' : ''
            }`}
          >
            {v.pipeAccent && <span className="inline-block w-[3px] h-[10px] bg-brand shrink-0" />}
            {article.categoryLabel}
          </span>
        )}
        <h3 className={`${v.title} mt-[5px] mb-1.5 leading-[1.15] tracking-[-0.025em] font-bold`}>
          <Link href={href} className="hover:text-brand">
            {article.title}
          </Link>
        </h3>
        {v.showExcerpt && (
          <p className={v.excerptClass || 'text-[13px] text-[#525b64] mb-[9px] leading-[1.5]'}>
            {article.excerpt}
          </p>
        )}
        {v.showMeta && (
          <div className={`flex gap-2.5 text-[11px] ${v.metaClass || 'text-[#8a9197]'}`}>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span className="before:content-['•'] before:mr-2">{article.readTime}</span>
          </div>
        )}
      </div>
    </article>
  );
}