import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { HeroVideoSection } from '../components/HeroVideoSection';
import { Story } from '../components/Story';
import { Pricing } from '../components/Pricing';
import { Amenities } from '../components/Amenities';
import { Location } from '../components/Location';
import { FloorPlans } from '../components/FloorPlans';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { FloatingCTA } from '../components/FloatingCTA';

export function Home() {
  useEffect(() => {
    document.title = 'THE SKY49 | Ultra-Luxury Residences in Tellapur';
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <HeroVideoSection />
      <Story />
      <Pricing />
      <Amenities />
      <Location />
      <FloorPlans />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
