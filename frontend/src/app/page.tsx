import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { HeroSection } from '@/components/home/HeroSection';
import { USPStrip } from '@/components/home/USPStrip';
import { WhyGronLiv } from '@/components/home/WhyGronLiv';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HowItWorks } from '@/components/home/HowItWorks';
import { IngredientGallery } from '@/components/home/IngredientGallery';
import { DeliverySection } from '@/components/home/DeliverySection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <USPStrip />
        <WhyGronLiv />
        <FeaturedProducts />
        <HowItWorks />
        <IngredientGallery />
        <DeliverySection />
        <section className="py-16 bg-[#F4F0E8] text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-headline-sm md:text-headline-md font-manrope font-semibold text-[#112419] mb-4">Customer Reviews</h2>
            <p className="text-body-md font-merriweather text-[#48544D] max-w-2xl mx-auto italic">
              &ldquo;Best nutrition platform I&apos;ve ever used. The quality is unmatched. I love the smooth texture and fresh taste!&rdquo; - Verified Customer
            </p>
          </div>
        </section>
        <FinalCTA />
      </main>
      <WhatsAppFAB />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
