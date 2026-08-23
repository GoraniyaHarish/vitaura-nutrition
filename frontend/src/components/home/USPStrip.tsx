import { Truck, ShieldCheck, Sparkles, Leaf, Award, CheckCircle2 } from "lucide-react";

export function USPStrip() {
  const usps = [
    {
      icon: Truck,
      title: "Cold-Chain Dispatch",
      subtitle: "Fresh delivery across Rajkot",
    },
    {
      icon: ShieldCheck,
      title: "100% Purity Guarantee",
      subtitle: "Lab verified & unadulterated",
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      subtitle: "Raw superfoods & whole oats",
    },
    {
      icon: Sparkles,
      title: "Zero Preservatives",
      subtitle: "Prepared fresh to order daily",
    },
    {
      icon: Award,
      title: "Crafted Fresh",
      subtitle: "100% Raw Plant Nutrition",
    },
    {
      icon: CheckCircle2,
      title: "Rajkot Kitchen Hub",
      subtitle: "Local artisan preparation",
    },
  ];

  return (
    <div className="bg-[#183324] text-[#FAF8F5] py-5 border-y border-[#C8A265]/20 overflow-hidden relative">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {[...usps, ...usps].map((usp, idx) => {
          const Icon = usp.icon;
          return (
            <div key={idx} className="flex items-center gap-3.5 group shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#C8A265]/15 border border-[#C8A265]/30 flex items-center justify-center text-[#D8B778] shrink-0 group-hover:scale-110 group-hover:bg-[#C8A265]/30 transition-all duration-300">
                <Icon size={18} strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-manrope font-bold text-xs md:text-sm tracking-wider uppercase text-[#FAF8F5]">
                  {usp.title}
                </h4>
                <p className="font-merriweather text-[11px] text-[#FAF8F5]/75">
                  {usp.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
