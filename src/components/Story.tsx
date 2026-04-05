import { motion } from 'motion/react';

export function Story() {
  return (
    <section className="relative bg-warm-white py-12 md:py-20">
      <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 md:order-1"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-stone"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-muted">The Architecture</span>
            </div>
            
            <h2 className="mb-8 text-balance font-serif text-4xl leading-tight text-charcoal md:text-5xl lg:text-6xl">
              A Monument to <br />
              <span className="italic text-gold">Modern Elegance</span>
            </h2>
            
            <p className="text-muted font-light leading-relaxed mb-6 text-lg">
              Rising majestically above Tellapur, THE SKY49 is not just a residence; it is an architectural masterpiece designed for those who appreciate the finer nuances of luxury.
            </p>
            <p className="text-muted font-light leading-relaxed mb-12 text-lg">
              Every line, every angle, and every material has been meticulously chosen to create a living experience that is both visually stunning and profoundly comfortable. Expansive glass facades invite natural light, while thoughtfully curated interiors provide a canvas for your personal legacy.
            </p>
            
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 text-charcoal transition-colors hover:text-gold"
            >
              <span className="text-xs font-medium tracking-wide">Download Brochure</span>
              <div className="h-[1px] w-8 bg-charcoal transition-all duration-300 group-hover:w-12 group-hover:bg-gold"></div>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 md:order-2 relative"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src="/2-1024x682.png" 
                alt="THE SKY49 architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[12px] border-warm-white/20"></div>
            </div>
            
            {/* Floating accent image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -bottom-12 -left-12 w-2/3 aspect-square border-8 border-warm-white shadow-2xl hidden md:block"
            >
              <img 
                src="/12%20(1).png" 
                alt="THE SKY49 interior detail" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
