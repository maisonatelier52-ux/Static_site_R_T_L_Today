'use client';

import Link from 'next/link';
import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] text-white border-t-[3px] border-brand pt-10 pb-[18px]">
      <div className="w-[min(1200px,calc(100%-40px))] max-[900px]:w-[min(100%-28px,1200px)] max-[430px]:w-[calc(100%-24px)] mx-auto grid grid-cols-[1.5fr_0.8fr_1fr_0.8fr_1.3fr] max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 gap-x-10 gap-y-10">
        {/* Brand */}
        <div className="max-[900px]:col-span-2 max-[480px]:col-span-1">
          <Link href="/" className="inline-flex items-center gap-0.5 text-xs font-extrabold tracking-[-0.04em]">
            <span className="grid place-items-center w-[26px] h-6 text-white bg-brand text-xs">R</span>
            <span className="grid place-items-center w-[26px] h-6 text-white bg-brand text-xs">T</span>
            <span className="grid place-items-center w-[26px] h-6 text-white bg-brand text-xs">L</span>
            <b className="ml-[5px] text-sm tracking-[0.02em]">TODAY</b>
          </Link>
          <p className="max-w-[300px] text-[#8d9399] text-[13px] leading-[1.6] mt-3.5">
            Your trusted source for breaking news, in-depth reporting, and real stories that matter.
          </p>
          <SocialIcons className="mt-4" size="w-8 h-8" />
        </div>

        {/* Explore */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-white text-[15px] font-semibold mb-1.5">Explore</h3>
          <Link href="/" className="text-[13px] text-[#8d9399] hover:text-white">Home</Link>
          <Link href="/world" className="text-[13px] text-[#8d9399] hover:text-white">World</Link>
          <Link href="/business" className="text-[13px] text-[#8d9399] hover:text-white">Business</Link>
          <Link href="/technology" className="text-[13px] text-[#8d9399] hover:text-white">Technology</Link>
          <Link href="/culture" className="text-[13px] text-[#8d9399] hover:text-white">Culture</Link>
          <Link href="/sport" className="text-[13px] text-[#8d9399] hover:text-white">Sport</Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-white text-[15px] font-semibold mb-1.5">Quick Links</h3>
          <Link href="/about" className="text-[13px] text-[#8d9399] hover:text-white">About Us</Link>
          <Link href="/team" className="text-[13px] text-[#8d9399] hover:text-white">Our Team</Link>
          <Link href="/contact" className="text-[13px] text-[#8d9399] hover:text-white">Contact Us</Link>
          <Link href="/advertise" className="text-[13px] text-[#8d9399] hover:text-white">Advertise</Link>
          <Link href="/corrections-policy" className="text-[13px] text-[#8d9399] hover:text-white">Corrections Policy</Link>
          <Link href="/sitemap" className="text-[13px] text-[#8d9399] hover:text-white">Sitemap</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-white text-[15px] font-semibold mb-1.5">Legal</h3>
          <Link href="/privacy-policy" className="text-[13px] text-[#8d9399] hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="text-[13px] text-[#8d9399] hover:text-white">Terms &amp; Conditions</Link>
          <Link href="/cookie-policy" className="text-[13px] text-[#8d9399] hover:text-white">Cookie Policy</Link>
          <Link href="/editorial-policy" className="text-[13px] text-white font-medium hover:text-brand">Editorial Policy</Link>
        </div>

        {/* Newsletter */}
        <div className="max-[900px]:col-span-2 max-[480px]:col-span-1">
          <h3 className="text-white text-[15px] font-semibold mb-1.5">Newsletter</h3>
          <p className="text-[13px] text-[#8d9399] mb-3.5">Get the latest news delivered to your inbox.</p>
          <form className="flex max-[480px]:flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-0 bg-[#1a1b1e] border border-[#2a2c30] rounded-md px-3.5 py-2.5 text-[13px] text-white placeholder:text-[#6e747a] outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="shrink-0 bg-brand text-white text-[13px] font-semibold rounded-md px-5 py-2.5 hover:bg-[#e0323d] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="w-[min(1200px,calc(100%-40px))] max-[900px]:w-[min(100%-28px,1200px)] max-[430px]:w-[calc(100%-24px)] mx-auto flex max-[480px]:flex-col max-[480px]:gap-2 justify-between border-t border-[#2a2c30] pt-[18px] mt-10 text-[#6e747a] text-[12px]">
        <span>&copy; 2026 RTL Today. All rights reserved.</span>
        <span>Designed for the modern reader.</span>
      </div>
    </footer>
  );
}