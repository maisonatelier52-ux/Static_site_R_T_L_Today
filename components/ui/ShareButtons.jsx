'use client';

import { useEffect, useState } from 'react';

export default function ShareButtons({ title }) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const mediumHref = `https://medium.com/p/import?url=${encodedUrl}`;

  async function handleSubstackShare() {
    try {
      await navigator.clipboard.writeText(`${title} — ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // clipboard API unavailable, still open Substack
    }
    window.open('https://substack.com/notes', '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-[7px] font-extrabold tracking-[0.1em] mb-[5px] [writing-mode:vertical-rl]">SHARE</span>

      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-[34px] h-[34px] flex items-center justify-center rounded-full border border-line bg-white font-extrabold text-[13px] hover:border-ink transition-colors"
      >
        𝕏
      </a>

      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-[34px] h-[34px] flex items-center justify-center rounded-full border border-line bg-white font-extrabold text-[11px] hover:border-ink transition-colors"
      >
        in
      </a>

      <a
        href={mediumHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Medium"
        className="w-[34px] h-[34px] flex items-center justify-center rounded-full border border-line bg-white font-extrabold text-[13px] hover:border-ink transition-colors"
      >
        M
      </a>

      <div className="relative">
        <button
          onClick={handleSubstackShare}
          aria-label="Share on Substack"
          className="w-[34px] h-[34px] flex items-center justify-center rounded-full border border-line bg-white font-extrabold text-[13px] hover:border-ink transition-colors"
        >
          S
        </button>
        {copied && (
          <span className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink text-white text-[9px] font-bold px-2 py-1 rounded">
            Copied — paste into a Note
          </span>
        )}
      </div>
    </div>
  );
}