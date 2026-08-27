import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { HeroSection } from '@/components/home/HeroSection';
import { USPStrip } from '@/components/home/USPStrip';
import { WhyVitaura } from '@/components/home/WhyVitaura';
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
        <WhyVitaura />
        <FeaturedProducts />
        <HowItWorks />
        <IngredientGallery />
        <DeliverySection />
        <FinalCTA />
      </main>
      <WhatsAppFAB />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
