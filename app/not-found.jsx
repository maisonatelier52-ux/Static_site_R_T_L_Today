import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-[min(1100px,calc(100%-40px))] mx-auto min-h-[60vh] grid place-content-center text-center">
      <span className="text-brand text-[13px] font-extrabold">404</span>
      <h1 className="text-[52px] my-2">This story moved on.</h1>
      <p className="text-muted">The page could not be found, but the newsroom is still busy.</p>
      <Link href="/" className="mx-auto my-[15px] bg-ink text-white px-4 py-3 text-[11px] font-extrabold">
        Return to the latest news
      </Link>
    </div>
  );
}
