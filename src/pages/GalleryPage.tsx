import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GalleryGrid, useGalleryImages } from '../components/Gallery';
import { Footer } from '../components/Footer';
import { FloatingCTA } from '../components/FloatingCTA';

const defaultExtra = [
  {
    src: '/3-1-1024x682.png',
    title: 'Landscaped Arrival',
    desc: 'A curated approach to the everyday arrival experience.',
  },
  {
    src: '/12%20(1).png',
    title: 'Resort-Style Living',
    desc: 'Outdoor leisure crafted for year-round enjoyment.',
  },
];

export function GalleryPage() {
  const { mainImages, extraImages } = useGalleryImages();
  const extras = extraImages.length > 0 ? extraImages : defaultExtra;

  useEffect(() => {
    document.title = 'Gallery | THE SKY49';
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-warm-white">
      <header className="sticky top-0 z-40 border-b border-stone/40 bg-warm-white/90 backdrop-blur-md">
        <div className="container mx-auto grid max-w-full grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:px-6 md:px-12 md:py-4">
          <Link
            to="/"
            className="group inline-flex min-w-0 items-center gap-1.5 justify-self-start text-xs font-medium uppercase tracking-widest text-charcoal transition-colors hover:text-gold sm:gap-2 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Link>
          <span className="min-w-0 truncate text-center font-serif text-base text-charcoal sm:text-lg md:text-xl">
            THE SKY49
          </span>
          <Link
            to="/#contact"
            className="justify-self-end text-xs font-medium uppercase tracking-widest text-charcoal transition-colors hover:text-gold sm:text-sm"
          >
            Inquire
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container relative mx-auto max-w-full px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-3xl"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">Gallery</p>
            <h1 className="font-serif text-4xl leading-tight text-charcoal md:text-5xl lg:text-6xl">
              A Visual <span className="italic text-gold">Symphony</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light text-muted">
              Explore the architecture, interiors, and lifestyle moments that define THE SKY49.
            </p>
          </motion.div>

          <GalleryGrid images={mainImages} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 border-t border-stone/50 pt-14"
          >
            <h2 className="mb-8 font-serif text-2xl text-charcoal md:text-3xl">More perspectives</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {extras.map((item) => (
                <div
                  key={item.src}
                  className="group overflow-hidden rounded-[1.5rem] border border-stone/40 bg-white shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-charcoal">{item.title}</h3>
                    <p className="mt-2 text-sm font-light text-muted">{item.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gold">
                      <span>View</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
