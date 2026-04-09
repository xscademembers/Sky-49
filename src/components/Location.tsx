import { motion } from 'motion/react';
import { Building, Briefcase, Plane } from 'lucide-react';

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
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#EFECE5]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3196016508928!2d78.27522347594073!3d17.44441060115836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbed17e91b4b4b%3A0x19787397a2d26a29!2sThe%20SKY%2049%20by%20Ananda%20Prosper!5e0!3m2!1sen!2sin!4v1775729985100!5m2!1sen!2sin"
                title="The SKY 49 by Ananda Prosper — Hyderabad location"
                className="absolute inset-0 h-full w-full border-0"
                width={600}
                height={450}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
