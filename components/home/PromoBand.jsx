export default function PromoBand() {
  return (
    <section className="bg-[#030405] text-white py-[27px] max-[720px]:py-[19px] my-2.5 mb-4" aria-label="RTL programmes">
      <div className="w-[min(1100px,calc(100%-40px))] max-[900px]:w-[min(100%-28px,1100px)] max-[430px]:w-[calc(100%-24px)] mx-auto grid grid-cols-[0.8fr_repeat(4,1fr)] max-[720px]:grid-cols-2 gap-3 items-stretch">
        <div className="flex items-center gap-0.5 text-[12px] max-[720px]:col-span-2">
          <span className="bg-brand p-1.5 font-extrabold">R</span>
          <span className="bg-brand p-1.5 font-extrabold">T</span>
          <span className="bg-brand p-1.5 font-extrabold">L</span>
          <b className="ml-[5px]">PLAY</b>
        </div>
        <div
          className="min-h-[100px] max-[720px]:min-h-[95px] flex flex-col justify-end p-3 overflow-hidden"
          style={{ background: 'radial-gradient(circle at 80% 0,#ed3842,transparent 42%),linear-gradient(135deg,#b10009,#230003)' }}
        >
          <small className="text-[9px] tracking-[0.13em] opacity-85">LIVE</small>
          <strong className="text-[17px] my-[3px]">NEWSFLASH</strong>
          <span className="text-[10px] opacity-80">Every hour</span>
        </div>
        <div
          className="min-h-[100px] max-[720px]:min-h-[95px] flex flex-col justify-end p-3 overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#1c78c4,#091c42)' }}
        >
          <small className="text-[9px] tracking-[0.13em] opacity-85">PODCAST</small>
          <strong className="text-[17px] my-[3px]">Current affairs</strong>
          <span className="text-[10px] opacity-80">Context in 20 minutes</span>
        </div>
        <div
          className="min-h-[100px] max-[720px]:min-h-[95px] flex flex-col justify-end p-3 overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0d94d3,#063566)' }}
        >
          <small className="text-[9px] tracking-[0.13em] opacity-85">MORNING</small>
          <strong className="text-[17px] my-[3px]">New Notes</strong>
          <span className="text-[10px] opacity-80">Start informed</span>
        </div>
        <div
          className="min-h-[100px] max-[720px]:min-h-[95px] flex flex-col justify-end p-3 overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#12315b,#020d1e)' }}
        >
          <small className="text-[9px] tracking-[0.13em] opacity-85">NEWSLETTER</small>
          <strong className="text-[17px] my-[3px]">Late Brief</strong>
          <span className="text-[10px] opacity-80">In your inbox</span>
        </div>
      </div>
    </section>
  );
}
