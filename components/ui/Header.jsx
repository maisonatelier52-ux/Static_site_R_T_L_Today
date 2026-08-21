'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBolt,
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import SocialIcons from './SocialIcons';
import { categories, articles } from '../../lib/data';

// Categories shown in the main desktop nav bar, in display order.
// "luxembourg" is intentionally labelled "News" in the header even
// though its CATEGORY_LABELS value (used elsewhere) is "Luxembourg".
const MAIN_NAV_SLUGS = ['luxembourg', 'world', 'business', 'culture', 'sport', 'science', 'travel'];
const MAIN_NAV_LABEL_OVERRIDES = {
  luxembourg: 'News'
};

// Build the main nav directly from articles.json (via lib/data.js),
// instead of hard-coding it.
const mainNavItems = [
  ['Home', '/'],
  ...MAIN_NAV_SLUGS.map((slug) => {
    const category = categories.find((c) => c.slug === slug);
    const label = MAIN_NAV_LABEL_OVERRIDES[slug] || category?.label || slug;
    return [label, `/${slug}`];
  })
];

// Any category that isn't in the main nav still gets a link in the
// slide-out mobile menu (e.g. Luxembourg Life, Technology).
const extraNavItems = categories
  .filter((c) => !MAIN_NAV_SLUGS.includes(c.slug))
  .map((c) => [c.label, `/${c.slug}`]);

// Latest 5 published articles (already sorted newest-first in lib/data.js)
// drive the breaking-news marquee.
const breakingNews = articles.slice(0, 5).map((article) => ({
  id: article.id,
  title: article.title,
  href: `/${article.category}/${article.slug}`
}));

// ── Flat, searchable list of every published article ──────────────────────
const ALL_ARTICLES = articles.map((article) => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  category: article.category,
  categoryLabel: article.categoryLabel,
  excerpt: article.excerpt || article.intro || ''
}));

const topBarSocials = [
  [faFacebookF, 'https://facebook.com', 'Facebook'],
  [faXTwitter, 'https://x.com', 'X (Twitter)'],
  [faInstagram, 'https://instagram.com', 'Instagram'],
  [faYoutube, 'https://youtube.com', 'YouTube'],
  [faLinkedinIn, 'https://linkedin.com', 'LinkedIn']
];

function formatToday() {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('en-GB', { month: 'long' });
  const year = now.getFullYear();
  return { weekday, dateLabel: `${day} ${month} ${year}` };
}

// Wrap the portion(s) of `text` that match `query` in <mark> for highlighting.
function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-brand/15 text-brand rounded px-0.5 font-semibold not-italic">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function NewsflashMarquee({ items }) {
  const [isPaused, setIsPaused] = useState(false);

  if (!items.length) return null;

  // Duplicate the list so the track can loop seamlessly from -50%.
  const loopItems = [...items, ...items];

  return (
    <div
      className={`flex-1 flex items-center min-w-0 overflow-hidden transition-colors ${
        isPaused ? 'bg-line/60' : 'bg-soft'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="marquee-track flex items-center whitespace-nowrap"
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {loopItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={item.href}
            className="marquee-item inline-flex items-center text-[11px] md:text-[12px] px-4 hover:text-brand hover:underline underline-offset-2"
          >
            {item.title}
            <span className="mx-4 w-px h-3 bg-line inline-block" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-item:hover {
          background-color: rgba(227, 6, 19, 0.08);
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { weekday, dateLabel } = formatToday();

  // ── Live search state ────────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Focus the input as soon as the search bar opens.
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on outside click.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        closeSearch();
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOpen]);

  // Close search whenever the route changes.
  useEffect(() => {
    closeSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const runSearch = (query) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = ALL_ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(lower) || article.excerpt.toLowerCase().includes(lower)
    ).slice(0, 8);
    setSearchResults(filtered);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    runSearch(query);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchResults.length > 0) {
      handleArticleClick(searchResults[0].category, searchResults[0].slug);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Escape') closeSearch();
  };

  const handleArticleClick = (category, slug) => {
    closeSearch();
    router.push(`/${category}/${slug}`);
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-[100] bg-white">
      {/* Utility bar */}
      <div className="bg-black text-white">
        <div className="w-[min(1300px,calc(100%-40px))] mx-auto h-11 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-3 min-w-0">
            <FontAwesomeIcon icon={faCalendarDays} className="text-brand w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">
              {weekday}, <strong className="font-bold">{dateLabel}</strong>
            </span>
            <span className="hidden md:inline-block w-px h-4 bg-white/25 mx-2" />
            <span className="hidden md:inline text-white/75 truncate">Trusted News. A Clearer Tomorrow.</span>
          </div>

         <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-3 [&>a>svg]:w-3 [&>a>svg]:h-3">
            {topBarSocials.map(([icon, href, label]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/85 hover:text-brand"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Full-width search bar, replaces the utility bar's spot while open */}
      {searchOpen && (
        <div className="bg-ink py-[15px] relative" ref={searchContainerRef}>
          <form className="w-[min(1300px,calc(100%-40px))] mx-auto flex gap-2.5" onSubmit={handleSearchSubmit}>
            <label className="sr-only" htmlFor="site-search">Search RTL Today</label>
            <input
              id="site-search"
              name="q"
              ref={searchInputRef}
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search stories, places and topics&hellip;"
              className="flex-1 border-0 px-4 py-[13px] outline-none text-[15px]"
              aria-label="Search articles"
              aria-autocomplete="list"
              aria-expanded={searchResults.length > 0}
            />
            <button type="submit" className="border-0 bg-brand text-white font-extrabold px-[22px] text-[15px] shrink-0">
              Search
            </button>
            <button
              type="button"
              onClick={closeSearch}
              className="border-0 bg-transparent text-white/70 hover:text-white px-1 shrink-0"
              aria-label="Close search"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </form>

          {/* Live results dropdown, spans the same width as the search bar */}
          {(searchResults.length > 0 || searchQuery.trim().length >= 2) && (
            <div className="w-[min(1300px,calc(100%-40px))] mx-auto relative">
              <div
                className="absolute left-0 right-0 top-2 bg-white rounded-lg shadow-2xl border border-line overflow-hidden z-50"
                role="listbox"
                aria-label="Search results"
              >
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((article) => (
                      <button
                        key={article.id}
                        type="button"
                        onClick={() => handleArticleClick(article.category, article.slug)}
                        className="w-full text-left px-4 py-3 hover:bg-soft transition-colors border-b border-line last:border-0 group"
                        role="option"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-wider bg-brand text-white px-2 py-0.5 rounded">
                            {article.categoryLabel}
                          </span>
                          <span className="text-sm font-semibold text-ink group-hover:text-brand transition-colors leading-snug line-clamp-2">
                            {highlightMatch(article.title, searchQuery)}
                          </span>
                        </div>
                      </button>
                    ))}
                    <div className="px-4 py-2 bg-soft text-xs text-muted">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-muted">
                      No articles found for <span className="font-semibold text-ink">&ldquo;{searchQuery}&rdquo;</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Logo + main nav */}
      <div className="border-b border-line">
        <div className="w-[min(1300px,calc(100%-40px))] mx-auto h-[64px] flex items-center gap-4 md:gap-8">
          <button
            className="md:hidden border-0 bg-transparent text-ink hover:text-brand shrink-0 [&>svg]:w-4 [&>svg]:h-4"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link
            href="/"
            className="flex-1 md:flex-none flex md:inline-flex justify-center md:justify-start items-center gap-1 md:shrink-0"
            aria-label="RTL Today home"
          >
            <span className="grid place-items-center w-[26px] h-[26px] md:w-[34px] md:h-[34px] text-white bg-brand text-sm md:text-lg font-extrabold">R</span>
            <span className="grid place-items-center w-[26px] h-[26px] md:w-[34px] md:h-[34px] text-white bg-brand text-sm md:text-lg font-extrabold">T</span>
            <span className="grid place-items-center w-[26px] h-[26px] md:w-[34px] md:h-[34px] text-white bg-brand text-sm md:text-lg font-extrabold">L</span>
            <b className="ml-1.5 text-lg md:text-2xl font-extrabold tracking-[-0.02em] leading-none">TODAY</b>
          </Link>

          <nav
            className="hidden md:flex items-center gap-6 text-[14px] md:text-[15px] ms-8 font-semibold overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Main navigation"
          >
            {mainNavItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`pb-[7px] border-b-2 ${
                  isActive(href) ? 'text-brand border-brand' : 'border-transparent hover:text-brand'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="md:ml-auto shrink-0 border-0 bg-transparent text-ink hover:text-brand [&>svg]:w-4 [&>svg]:h-4"
            onClick={() => setSearchOpen((value) => !value)}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      {/* Newsflash ticker */}
      <div className="h-[38px] border-b border-line overflow-hidden flex items-stretch">
        <div
          className="flex items-center gap-1.5 bg-brand text-white font-extrabold uppercase text-[10px] md:text-[11px] tracking-wide pl-3 md:pl-4 pr-6 md:pr-7 shrink-0"
          style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0% 100%)' }}
        >
          <FontAwesomeIcon icon={faBolt} className="w-2.5 h-2.5" />
          Newsflash
        </div>
        <NewsflashMarquee items={breakingNews} />
      </div>

      {/* Slide-out menu */}
      <div className={`fixed inset-0 z-[300] ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!menuOpen}>
        <button
          className={`absolute inset-0 w-full border-0 bg-[rgba(8,10,14,0.52)] transition-opacity duration-[250ms] ease-in-out ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 w-[min(340px,88vw)] h-full px-[22px] max-[430px]:px-[18px] pt-[18px] max-[430px]:pt-4 pb-[22px] max-[430px]:pb-4 bg-white overflow-y-auto transition-transform duration-[280ms] ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-[102%]'}`}
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between border-b-2 border-ink pb-[12px]">
            <span className="text-sm font-extrabold">Explore RTL Today</span>
            <button className="min-w-[28px] h-[28px] inline-flex items-center justify-center hover:bg-soft [&>svg]:w-[13px] [&>svg]:h-[13px]" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <nav aria-label="Categories" className="flex flex-col">
            {mainNavItems
              .filter(([, href]) => href !== '/')
              .map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex justify-between border-b border-line py-[11px] px-1 text-[14px] font-bold hover:text-brand hover:pl-2 [&>span]:text-brand"
                >
                  {label}<span>&rarr;</span>
                </Link>
              ))}
            {extraNavItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex justify-between border-b border-line py-[11px] px-1 text-[14px] font-bold hover:text-brand hover:pl-2 [&>span]:text-brand"
              >
                {label}<span>&rarr;</span>
              </Link>
            ))}
          </nav>
          <div className="mt-[16px]">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.13em] text-muted mb-2">Follow us</span>
            <SocialIcons size="w-7 h-7" />
          </div>
          <div className="mt-[16px] bg-ink text-white p-4">
            <strong className="text-sm">Independent. Local. Clear.</strong>
            <p className="text-[#bfc5ca] text-[11px] leading-[1.5] mb-0 mt-1">News from Luxembourg with a wider view of the world.</p>
          </div>
        </aside>
      </div>
    </header>
  );
}