import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-[#0D0B0A]/75 backdrop-blur-lg text-[#F7F2EA] text-center border-t border-white/10 relative overflow-hidden">
      <div className="container-vitaura relative z-10 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest block mb-4 font-sans">
          The Culinary Nutrition Atelier
        </span>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-light text-[#F7F2EA] mb-6 tracking-tight leading-[1.1]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Elevate Your Daily Ritual with Pure Nutrition.
        </h2>
        <p className="text-base sm:text-lg font-sans text-[#C8BDB2] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Experience chef-crafted formulations made from 100% whole, clean botanicals. Delivered direct via cold-chain dispatch.
        </p>
        <Link 
          href="/menu" 
          className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#C87D55] text-[#12100F] rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#E09A72] transition-all shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300 border border-[#E09A72]/40"
        >
          <span>Explore All 8 Formulations</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
