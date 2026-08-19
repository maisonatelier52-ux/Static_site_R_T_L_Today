import Link from 'next/link';

export default function SectionHeader({ title, href, eyebrow }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-ink pb-2.5 mb-4">
      <div>
        {eyebrow && (
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-1 text-2xl leading-none tracking-[-0.04em]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-[13px] font-extrabold text-brand whitespace-nowrap">
          View all <span>&rarr;</span>
        </Link>
      )}
    </div>
  );
}
