import Image from 'next/image';
import { Check } from 'lucide-react';

export function WhyGronLiv() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F0E8] border-y border-[#183324]/10">
      <div className="container-gronliv">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <span className="text-xs font-bold text-[#C8A265] uppercase tracking-widest font-manrope">
              Uncompromising Quality Standard
            </span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-[#112419] leading-tight"
              style={{ fontFamily: 'var(--font-merriweather)' }}
            >
              Why High-Performers Choose GronLiv
            </h2>
            <p className="text-body-md font-merriweather text-[#48544D] leading-relaxed">
              We believe pure nutrition shouldn&apos;t compromise on taste or integrity. 
              Every shake is crafted with intention, utilizing cold-pressed whole foods to preserve essential bio-availability.
            </p>
            
            <ul className="flex flex-col gap-4 mt-2">
              {[
                'Sourced directly from verified organic farms in Gujarat',
                'Cold-processed daily to retain maximum enzyme & vitamin density',
                'Zero refined sugars, synthetic gums, or artificial fillers',
                'Delivered fresh in temperature-controlled glass vessels'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#183324] flex items-center justify-center text-[#D8B778] shrink-0 mt-0.5">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <span className="font-merriweather text-[#171D19] text-body-md leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full lg:w-1/2 relative h-[420px] rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(17,36,25,0.08)] border border-[#183324]/15">
            <Image
              src="/images/why-gronliv-ingredients.jpg"
              alt="Fresh natural organic ingredients layout"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112419]/70 via-transparent to-transparent flex items-end p-6">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/40 max-w-sm">
                <p className="text-xs font-bold text-[#112419] font-manrope uppercase tracking-wider">100% Transparency Guarantee</p>
                <p className="text-xs text-[#48544D] font-merriweather mt-1">Every batch is lab-certified for purity & enzymatic activity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
