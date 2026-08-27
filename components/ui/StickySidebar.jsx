import Link from 'next/link';
import WeatherWidget from '@/components/ui/WeatherWidget';

export default function StickySidebar({ latest = [] }) {
  return (
    <aside className="flex flex-col gap-2.5 sticky top-[154px] self-start max-md:relative max-md:top-auto max-md:mt-5 max-md:grid max-md:grid-cols-2">
      {/* <div className="h-[54px] flex items-center gap-1.5 bg-ink text-white px-2.5 text-[10px] tracking-[0.08em] max-md:col-span-2">
        <span className="w-[7px] h-[7px] rounded-full bg-brand shadow-[0_0_0_4px_rgba(227,6,19,0.2)]" />
        LIVE <strong className="text-[15px]">NEWSFLASH</strong>
        <button
          aria-label="Play newsflash"
          className="ml-auto w-[30px] h-[30px] rounded-full border-0 text-white bg-brand text-[11px]"
        >
          &#9654;
        </button>
      </div> */}

      <div
        className="min-h-[175px] max-md:min-h-[155px] flex flex-col justify-end p-[18px] text-white"
        style={{ background: 'linear-gradient(145deg,#016db3,#052751)' }}
      >
        <span className="text-[10px] tracking-[0.14em]">LIVE RADIO</span>
        <strong className="text-[22px] mt-[5px]">The Morning Brief</strong>
        <p className="text-[#c9dded] text-[12px]">Smart headlines in twelve minutes.</p>
        <button className="self-start border border-white/55 bg-transparent text-white px-[11px] py-[7px] text-[11px] font-extrabold mt-2">
          Listen now
        </button>
      </div>

      <WeatherWidget />

      {latest.length > 0 && (
        <div className="border-t-[3px] border-ink bg-white max-md:hidden">
          {latest.slice(0, 3).map((item, index) => (
            <Link
              href={`/${item.category}/${item.slug}`}
              key={item.id}
              className="grid grid-cols-[22px_1fr] gap-[7px] py-2 border-t border-line text-[14px] leading-[1.3]"
            >
              <b className="text-brand">{String(index + 1).padStart(2, '0')}</b>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}