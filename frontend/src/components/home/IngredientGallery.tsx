import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export function IngredientGallery() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="container-gronliv">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#183324]/10 text-[#112419] text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider font-manrope border border-[#183324]/15">
            <Sparkles size={13} className="text-[#C8A265]" aria-hidden="true" />
            <span>Pure Superfood Sourcing</span>
          </div>
          <h2 
            className="text-display-mobile md:text-3xl font-extrabold text-[#112419] mb-4"
            style={{ fontFamily: 'var(--font-merriweather)' }}
          >
            Nothing to Hide. Everything to Love.
          </h2>
          <p 
            className="text-body-md md:text-body-lg text-[#48544D] leading-relaxed font-merriweather"
          >
            We celebrate total transparency. From single-origin organic cacao to non-GMO rolled oats and fresh local fruits — every ingredient serves a vital biological function.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          {/* Main Hero Mosaic Item */}
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-sm group border border-[#183324]/12 bg-[#F4F0E8]">
            <Image 
              src="/images/ingredient-main.jpg" 
              alt="Assorted fresh whole ingredients" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112419]/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-bold text-[#D8B778] tracking-wider uppercase block font-manrope">Whole Food Philosophy</span>
                <p className="text-white font-bold text-lg md:text-xl font-manrope">
                  100% Unrefined & Unprocessed
                </p>
              </div>
            </div>
          </div>

          {/* Organic Rolled Oats */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm group border border-[#183324]/12 bg-[#F4F0E8] aspect-[4/5]">
            <Image 
              src="/images/ingredient-oats.jpg" 
              alt="Organic rolled oats" 
              fill 
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112419]/70 via-transparent to-transparent flex items-end p-4">
              <p className="text-white font-semibold text-sm font-manrope">
                Organic Rolled Oats
              </p>
            </div>
          </div>

          {/* Raw Cacao */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm group border border-[#183324]/12 bg-[#F4F0E8] aspect-[4/5]">
            <Image 
              src="/images/ingredient-cacao.jpg" 
              alt="Raw organic cacao beans" 
              fill 
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112419]/70 via-transparent to-transparent flex items-end p-4">
              <p className="text-white font-semibold text-sm font-manrope">
                Single-Origin Raw Cacao
              </p>
            </div>
          </div>

          {/* Wild Berries */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-sm group border border-[#183324]/12 bg-[#F4F0E8]">
            <Image 
              src="/images/ingredient-berries.jpg" 
              alt="Wild antioxidant berries" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112419]/80 via-transparent to-transparent flex items-end p-5">
              <div>
                <span className="text-xs font-bold text-[#D8B778] tracking-wider uppercase block font-manrope">Antioxidant Fuel</span>
                <p className="text-white font-bold text-base md:text-lg font-manrope">
                  Fresh Farm Strawberries & Blueberries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
