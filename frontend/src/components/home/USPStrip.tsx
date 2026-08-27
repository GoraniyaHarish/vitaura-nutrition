import { Truck, ShieldCheck, Sparkles, Leaf, Award, CheckCircle2 } from "lucide-react";

export function USPStrip() {
  const usps = [
    {
      icon: Truck,
      title: "Cold-Chain Dispatch",
      subtitle: "Temperature-controlled freshness",
    },
    {
      icon: ShieldCheck,
      title: "100% Clean Label",
      subtitle: "Zero artificial additives",
    },
    {
      icon: Leaf,
      title: "Whole Superfoods",
      subtitle: "Raw botanicals, seeds & nuts",
    },
    {
      icon: Sparkles,
      title: "Zero Preservatives",
      subtitle: "Prepared fresh to order daily",
    },
    {
      icon: Award,
      title: "Chef-Crafted",
      subtitle: "Gastronomic formulation",
    },
    {
      icon: CheckCircle2,
      title: "Artisan Kitchen",
      subtitle: "Small-batch culinary precision",
    },
  ];

  return (
    <div className="bg-[#1A1412] text-[#FBF9F5] py-4 border-b border-white/10 overflow-hidden relative select-none">
      <div className="animate-marquee flex items-center gap-14 whitespace-nowrap">
        {[...usps, ...usps].map((usp, idx) => {
          const Icon = usp.icon;
          return (
            <div key={idx} className="flex items-center gap-3.5 group shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#C87D55]/15 border border-[#C87D55]/30 flex items-center justify-center text-[#C87D55] shrink-0 group-hover:scale-105 group-hover:bg-[#C87D55]/25 transition-all duration-300">
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-[#FBF9F5]">
                  {usp.title}
                </h4>
                <p className="font-sans text-[11px] text-[#FBF9F5]/65">
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
