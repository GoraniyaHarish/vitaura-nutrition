import { Truck, ShieldCheck, Sparkles, Leaf } from "lucide-react";

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
  ];

  return (
    <div className="bg-[#183324] text-[#FAF8F5] py-7 border-y border-[#C8A265]/20">
      <div className="container-gronliv">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#C8A265]/15 border border-[#C8A265]/30 flex items-center justify-center text-[#D8B778] shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-xs md:text-sm tracking-wide text-[#FAF8F5]">
                    {usp.title}
                  </h4>
                  <p className="font-merriweather text-[11px] text-[#FAF8F5]/70">
                    {usp.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
