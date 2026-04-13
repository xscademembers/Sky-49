import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const amenities = [
  {
    title: 'The Grand Clubhouse',
    subtitle: '50,000 Sq.Ft. of Leisure',
    desc: 'A sprawling sanctuary featuring a temperature-controlled pool, private theatre, and fine-dining spaces designed for the elite.',
    img: '/2-1024x682.png',
  },
  {
    title: 'Sky Lounge & Deck',
    subtitle: 'Level 49 Observatory',
    desc: 'Elevate your evenings at the 49th-level observatory deck, offering panoramic views of the Hyderabad skyline.',
    img: '/3-1024x682.png',
  },
  {
    title: 'Wellness Sanctuary',
    subtitle: 'Holistic Rejuvenation',
    desc: 'State-of-the-art fitness center, yoga pavilion, and a full-service spa designed for your physical and mental well-being.',
    img: '/5-1024x682.png',
  },
  {
    title: 'Private Courtyards',
    subtitle: 'Serene Escapes',
    desc: 'Immaculately landscaped gardens and serene water features that provide a tranquil escape from the urban rush.',
    img: '/4-1024x682.png',
  },
];

type Amenity = (typeof amenities)[number];

const AmenityRow: React.FC<{ amenity: Amenity; index: number }> = ({ amenity, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center gap-8 py-10 md:py-14 lg:gap-0 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Image container — parallax on wrapper; plain <img> for reliable loading */}
      <div className="relative h-[42vh] min-h-[220px] w-full overflow-hidden rounded-xl bg-stone/40 shadow-2xl sm:h-[50vh] md:h-[70vh] lg:w-8/12 lg:rounded-none">
        <motion.div style={{ y }} className="absolute inset-0 h-[115%] w-full -top-[7.5%]">
          <img
            src={amenity.img}
            alt={amenity.title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-charcoal/10 transition-colors duration-700 hover:bg-transparent" />
      </div>

      {/* Overlapping text card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`glass-panel relative z-10 -mt-16 w-[94%] max-w-lg p-6 sm:-mt-20 sm:w-[90%] sm:p-8 md:p-12 lg:mt-0 lg:w-5/12 lg:max-w-none lg:p-16 ${
          isEven ? 'lg:-ml-32' : 'lg:-mr-32'
        }`}
      >
        <span className="mb-6 block font-serif text-2xl italic text-gold">0{index + 1}</span>
        <h3 className="mb-3 font-serif text-3xl text-charcoal md:text-4xl">{amenity.title}</h3>
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-gold">{amenity.subtitle}</p>
        <p className="mb-10 text-lg font-light leading-relaxed text-muted">{amenity.desc}</p>

        <a
          href="#contact"
          className="group inline-flex items-center gap-4 text-charcoal transition-colors hover:text-gold"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Explore Space</span>
          <div className="h-[1px] w-8 bg-charcoal transition-all duration-300 group-hover:w-12 group-hover:bg-gold" />
          <ArrowRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      </motion.div>
    </div>
  );
};

export function Amenities() {
  return (
    <section className="overflow-hidden bg-warm-white py-12 md:py-20">
      <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="w-full max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-[1px] w-8 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Signature Lifestyle</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-balance font-serif text-4xl leading-tight text-charcoal md:text-5xl lg:text-6xl"
            >
              Curated for the <br />
              <span className="italic text-gold">Connoisseurs of Life</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md text-base font-light text-muted sm:text-lg"
          >
            Experience hospitality-grade amenities that blur the line between a luxury resort and your daily residence.
          </motion.p>
        </div>

        {/* Editorial Layout Rows */}
        <div className="flex flex-col gap-8 md:gap-0">
          {amenities.map((amenity, index) => (
            <AmenityRow key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
