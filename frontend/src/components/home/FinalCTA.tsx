import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-primary text-on-primary text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-headline-md md:text-display-lg-mobile font-manrope font-bold mb-6">
          Ready to Elevate Your Nutrition?
        </h2>
        <p className="text-body-md md:text-body-lg font-merriweather text-inverse-primary max-w-2xl mx-auto mb-10">
          Join the GronLiv community today and experience the difference of fresh, premium ingredients.
        </p>
        <Link 
          href="/menu" 
          className="inline-block px-10 py-4 bg-surface text-primary rounded-full font-manrope font-bold text-lg hover:bg-surface-container-lowest transition-colors shadow-lg hover:scale-105 transform duration-200"
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}
