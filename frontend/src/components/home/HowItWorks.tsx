import { Sparkles } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select Formulation",
      desc: "Choose from 8 chef-crafted protein shakes, wellness bowls, and nutrient-dense power bites tailored to your vitality goals."
    },
    {
      number: "02",
      title: "Artisan Kitchen Prep",
      desc: "Each order is prepared in small batches using 100% whole, clean botanicals with zero preservatives or synthetic gums."
    },
    {
      number: "03",
      title: "Cold-Chain Dispatch",
      desc: "Delivered directly to your door in temperature-monitored packaging to guarantee peak enzymatic freshness."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-transparent border-b border-white/10">
      <div className="container-vitaura text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#211B18] text-[#C87D55] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest font-sans border border-white/10 shadow-xs">
            <Sparkles size={13} className="text-[#C87D55]" aria-hidden="true" />
            <span>The Kitchen Ritual</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            How Pure Nutrition Arrives
          </h2>
          <p className="text-[#C8BDB2] text-base md:text-lg font-sans font-normal leading-relaxed">
            From our artisan kitchen to your doorstep — seamless, uncompromised, and uncompromisingly fresh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-[1px] bg-white/10 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-[#211B18] text-[#F7F2EA] flex items-center justify-center text-xl font-bold font-serif mb-6 shadow-md border-2 border-white/10 group-hover:border-[#C87D55] group-hover:scale-105 transition-all duration-300">
                <span className="text-[#C87D55]">{step.number}</span>
              </div>
              <h3
                className="text-xl font-semibold text-[#F7F2EA] mb-2 font-serif"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#C8BDB2] max-w-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
