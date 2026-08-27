import Image from 'next/image';
import { Check } from 'lucide-react';
import { CountUp } from '@/components/animations/CountUp';

export function WhyVitaura() {
  return (
    <section className="py-20 md:py-32 bg-[#1A1412]/50 backdrop-blur-md border-b border-white/10">
      <div className="container-vitaura">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Narrative & Anatomy of Purity */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans">
              The Anatomy of Purity
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Why Discerning Wellness Chooses Vitaura
            </h2>
            <p className="text-[#C8BDB2] text-base md:text-lg leading-relaxed font-sans font-normal">
              We reject industrial powders, synthetic emulsifiers, and artificial flavor isolates. 
              Every formulation is chef-crafted with culinary intention from 100% bioavailable whole foods to provide sustained vitality.
            </p>
            
            <ul className="flex flex-col gap-3.5 mt-1">
              {[
                'Chef-crafted small-batch recipes balancing culinary flavor and nutrient density',
                '100% unrefined superfoods, raw nuts, sprouted grains, and cold-pressed extracts',
                'Zero refined cane sugars, gums, synthetic fillers, or artificial preservatives',
                'Prepared fresh to order with temperature-controlled cold-chain dispatch'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 bg-[#211B18] p-3.5 rounded-2xl border border-white/10 shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-[#12100F] flex items-center justify-center text-[#C87D55] shrink-0 mt-0.5 border border-white/10">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="font-sans text-[#F7F2EA] text-xs sm:text-sm leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Verified Formulation Data Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-2 border-t border-white/10">
              <div className="bg-[#211B18] p-4 rounded-2xl border border-white/10 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F7F2EA] font-sans tabular-nums">
                  <CountUp to={24} suffix="g" duration={1.2} />
                </p>
                <p className="text-[10px] sm:text-[11px] font-bold text-[#C8BDB2] font-sans mt-1 uppercase tracking-wider">Peak Protein</p>
              </div>

              <div className="bg-[#211B18] p-4 rounded-2xl border border-white/10 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F7F2EA] font-sans tabular-nums">
                  <CountUp to={16} duration={1.2} />
                </p>
                <p className="text-[10px] sm:text-[11px] font-bold text-[#C8BDB2] font-sans mt-1 uppercase tracking-wider">Clean Ingredients</p>
              </div>

              <div className="bg-[#211B18] p-4 rounded-2xl border border-white/10 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F7F2EA] font-sans tabular-nums">
                  <CountUp to={8} duration={1.2} />
                </p>
                <p className="text-[10px] sm:text-[11px] font-bold text-[#C8BDB2] font-sans mt-1 uppercase tracking-wider">Formulations</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Framed Photography & Whole Food Commitment */}
          <div className="w-full lg:w-1/2 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-[0_20px_48px_rgba(0,0,0,0.5)] border border-white/10 group">
            <Image
              src="/images/why-vitaura-ingredients.jpg"
              alt="Fresh natural organic whole food superfood ingredients"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 550px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100F]/90 via-transparent to-transparent flex items-end p-6">
              <div className="bg-[#12100F]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-sm shadow-lg">
                <p className="text-[11px] font-extrabold text-[#C87D55] font-sans uppercase tracking-widest">100% Whole Food Commitment</p>
                <p className="text-xs text-[#C8BDB2] font-sans mt-1 leading-relaxed">Pure botanical nourishment crafted without shortcuts, fillers, or artificial isolates.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
