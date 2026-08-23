export function HowItWorks() {
  const steps = [
    { number: "01", title: "Choose Your Blend", desc: "Select from our range of nutritionist-crafted blends." },
    { number: "02", title: "Freshly Prepared", desc: "We prepare your order using premium natural ingredients." },
    { number: "03", title: "Delivered to You", desc: "Enjoy your fresh nutrition delivered straight to your door." }
  ];

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-headline-md font-manrope font-semibold text-primary mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-outline-variant z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-headline-sm font-manrope font-bold mb-6 shadow-md border-4 border-surface">
                {step.number}
              </div>
              <h3 className="text-headline-sm font-manrope font-semibold text-on-surface mb-2">
                {step.title}
              </h3>
              <p className="text-body-md font-merriweather text-on-surface-variant max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
