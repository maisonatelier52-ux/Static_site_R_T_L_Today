const ICONS = {
  facebook: (
    <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
  ),
  x: (
    <path d="M13.6 10.62 20.2 3h-1.57l-5.73 6.62L8.3 3H3l6.92 10.02L3 21h1.57l6.05-6.99L15.7 21H21l-7.4-10.38Zm-2.14 2.48-.7-1L5.3 4.2h2.4l4.5 6.43.7 1 5.85 8.37h-2.4l-4.79-6.9Z" />
  ),
  instagram: (
    <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.16-.56.55-.9 1.11-1.16 1.77-.25.64-.42 1.37-.47 2.43C2 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.16 1.77.55.56 1.11.9 1.77 1.16.64.25 1.37.42 2.43.47C8.94 22 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.16.56-.55.9-1.11 1.16-1.77.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.16-1.77 4.9 4.9 0 0 0-1.77-1.16c-.64-.25-1.37-.42-2.43-.47C15.06 2 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.2 1.86.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.3.88.34 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.2 1.5-.34 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.88.3-1.86.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.2-1.86-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.3-.88-.34-1.86C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.2-1.5.34-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.88-.3 1.86-.34C9.01 3.81 9.33 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
  ),
  youtube: (
    <path d="M23.5 6.6a3.02 3.02 0 0 0-2.12-2.14C19.5 4 12 4 12 4s-7.5 0-9.38.46A3.02 3.02 0 0 0 .5 6.6 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.4 3.02 3.02 0 0 0 2.12 2.14C4.5 20 12 20 12 20s7.5 0 9.38-.46a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.4ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  ),
  twitter: (
    <path d="M13.6 10.62 20.2 3h-1.57l-5.73 6.62L8.3 3H3l6.92 10.02L3 21h1.57l6.05-6.99L15.7 21H21l-7.4-10.38Zm-2.14 2.48-.7-1L5.3 4.2h2.4l4.5 6.43.7 1 5.85 8.37h-2.4l-4.79-6.9Z" />
  ),
};

const DEFAULT_LINKS = [
  ['facebook', 'https://facebook.com', 'Facebook'],
  ['x', 'https://x.com', 'X (Twitter)'],
  ['instagram', 'https://instagram.com', 'Instagram'],
  ['youtube', 'https://youtube.com', 'YouTube'],
  ['linkedin', 'https://linkedin.com', 'LinkedIn']
];

const LABELS = {
  twitter: 'X (Twitter)',
  quora: 'Quora',
  reddit: 'Reddit',
  medium: 'Medium',
  website: 'Website'
};

// Pass `social` (e.g. an author.social object: { twitter, quora, reddit, medium })
// and/or `website` to render data-driven links. With neither prop, falls back
// to the default site-wide social set used in the Header/Footer.
export default function SocialIcons({ social, website, className = '', size = 'w-9 h-9' }) {
  const isDataDriven = Boolean(social || website);

  const links = isDataDriven
    ? [
        ...(website ? [['website', website, LABELS.website]] : []),
        ...Object.entries(social || {})
          .filter(([, href]) => href)
          .map(([key, href]) => [key, href, LABELS[key] || key])
      ]
    : DEFAULT_LINKS;

  if (!links.length) return null;

  return (
    <div className={`flex items-center gap-2.5 ${className}`.trim()}>
      {links.map(([key, href, label]) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${size} inline-flex items-center justify-center rounded-full bg-ink text-white hover:bg-brand transition-colors duration-150 [&>svg]:w-[17px] [&>svg]:h-[17px] text-[11px] font-extrabold`}
        >
          {ICONS[key] ? (
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              {ICONS[key]}
            </svg>
          ) : (
            key.charAt(0).toUpperCase()
          )}
        </a>
      ))}
    </div>
  );
}