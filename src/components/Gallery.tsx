import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const defaultImages = [
  {
    src: '/2000-x-1333-1024x682.png',
    aspect: 'aspect-[4/5]',
    title: 'The Facade',
    desc: 'Iconic architecture that redefines the Tellapur skyline.',
  },
  {
    src: '/3-1024x682.png',
    aspect: 'aspect-[16/9]',
    title: 'Living Spaces',
    desc: 'Expansive, sunlit interiors designed for modern luxury.',
  },
  {
    src: '/5-1024x682.png',
    aspect: 'aspect-square',
    title: 'Master Suite',
    desc: 'A private sanctuary of comfort and elegance.',
  },
  {
    src: '/4-1024x682.png',
    aspect: 'aspect-[3/4]',
    title: 'Bath Elegance',
    desc: 'Spa-inspired bathrooms with premium fixtures.',
  },
];

export type GalleryImage = {
  _id?: string;
  src: string;
  aspect: string;
  title: string;
  desc: string;
  category?: string;
  order?: number;
};

function ParallaxImage({
  image,
  offset,
  className = '',
}: {
  image: GalleryImage;
  offset: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative w-full ${className}`}
    >
      <div
        className={`${image.aspect} relative overflow-hidden rounded-[2rem] bg-stone/30 shadow-xl`}
      >
        <motion.div style={{ y }} className="absolute inset-0 h-[118%] w-full -top-[9%]">
          <img
            src={image.src}
            alt={image.title}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-charcoal/10 transition-colors duration-500 group-hover:bg-transparent" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/90 p-6 shadow-2xl backdrop-blur-md">
          <div className="min-w-0">
            <h4 className="mb-1 font-serif text-xl text-charcoal">{image.title}</h4>
            <p className="text-xs font-light text-muted">{image.desc}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone/30 text-charcoal transition-colors group-hover:bg-gold/20">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryGrid({ images: propImages }: { images?: GalleryImage[] }) {
  const imgs = propImages && propImages.length >= 4 ? propImages : defaultImages;

  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
      <div className="space-y-8 md:col-span-5 md:mt-16 md:space-y-14">
        <ParallaxImage image={imgs[0]} offset={40} />
        {imgs[2] && <ParallaxImage image={imgs[2]} offset={30} />}
      </div>

      <div className="space-y-8 md:col-span-7 md:space-y-14">
        {imgs[1] && <ParallaxImage image={imgs[1]} offset={60} />}
        {imgs[3] && (
          <div className="md:px-16">
            <ParallaxImage image={imgs[3]} offset={45} />
          </div>
        )}
      </div>
    </div>
  );
}

export function useGalleryImages() {
  const [mainImages, setMainImages] = useState<GalleryImage[]>(defaultImages);
  const [extraImages, setExtraImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data: GalleryImage[]) => {
        const main = data.filter((i) => i.category === 'main');
        const extra = data.filter((i) => i.category === 'extra');
        if (main.length > 0) setMainImages(main);
        if (extra.length > 0) setExtraImages(extra);
      })
      .catch(() => {});
  }, []);

  return { mainImages, extraImages };
}

export function Gallery() {
  const { mainImages } = useGalleryImages();

  return (
    <section className="relative overflow-hidden bg-warm-white py-12 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

      <div className="container relative mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10 flex flex-col items-start gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="w-full max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center justify-start gap-3 sm:mb-6 sm:gap-4"
            >
              <div className="h-[1px] w-8 shrink-0 bg-gold sm:w-10" aria-hidden />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Gallery</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-balance font-serif text-4xl leading-[1.15] text-charcoal md:text-5xl lg:text-7xl"
            >
              A Visual <br />
              <span className="italic text-gold">Symphony</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full shrink-0 md:w-auto md:self-end"
          >
            <Link
              to="/gallery"
              className="group inline-flex w-full items-center justify-start gap-3 sm:gap-4 md:inline-flex md:w-auto"
            >
              <span className="text-sm font-medium uppercase tracking-widest text-charcoal transition-colors group-hover:text-gold">
                View Full Gallery
              </span>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone transition-colors group-hover:border-gold sm:h-12 sm:w-12">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        <GalleryGrid images={mainImages} />
      </div>
    </section>
  );
}
