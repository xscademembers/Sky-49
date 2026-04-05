import { motion } from 'motion/react';
import { MapPin, Building, Briefcase, Plane } from 'lucide-react';

export function Location() {
  return (
    <section className="relative overflow-hidden bg-stone/20 py-12 md:py-20">
      <div className="container relative z-10 mx-auto max-w-full px-4 sm:px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-gold"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-muted">The Address</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-8">
              Tellapur: <br />
              <span className="italic text-gold">The New Elite</span>
            </h2>
            
            <p className="text-muted font-light leading-relaxed mb-12 text-lg max-w-md">
              Strategically positioned in Hyderabad's most coveted growth corridor, THE SKY49 offers unparalleled connectivity to global IT hubs while maintaining a serene, unpolluted environment.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Briefcase className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Financial District</h4>
                  <p className="text-sm text-muted font-light">10 Minutes • Seamless drive to major tech parks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Building className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Gachibowli</h4>
                  <p className="text-sm text-muted font-light">15 Minutes • Premium retail and entertainment</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Plane className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">International Airport</h4>
                  <p className="text-sm text-muted font-light">35 Minutes • Direct access via ORR</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative h-[min(420px,65svh)] min-h-[260px] w-full overflow-hidden rounded-2xl glass-panel p-2 md:h-[600px] md:min-h-0"
          >
            {/* Abstract Premium Map Representation */}
            <div className="w-full h-full bg-[#EFECE5] rounded-xl relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                alt="Map View" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
              
              {/* Map Overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EFECE5]/80 to-transparent"></div>
              
              {/* Floating Pins */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="bg-charcoal text-white px-4 py-2 rounded-full text-xs font-medium tracking-wider shadow-xl mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gold" /> THE SKY49
                </div>
                <div className="w-4 h-4 bg-gold rounded-full animate-pulse"></div>
                <div className="w-12 h-12 border border-gold/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
              </motion.div>

              {/* Connectivity Lines */}
              <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1 }}
                  d="M 50% 50% L 20% 80%" 
                  stroke="var(--color-charcoal)" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                  fill="none" 
                  className="opacity-30"
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.2 }}
                  d="M 50% 50% L 80% 30%" 
                  stroke="var(--color-charcoal)" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                  fill="none" 
                  className="opacity-30"
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
