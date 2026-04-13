import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'motion/react';
import { TrendingUp, ShieldCheck, Clock } from 'lucide-react';

function CountUpRupee({
  target,
  delay = 0,
  className,
}: {
  target: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.25,
      delay,
      ease: [0.22, 0.65, 0.35, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, target, delay]);

  return (
    <span ref={ref} className={className}>
      ₹{value.toLocaleString('en-IN')}
    </span>
  );
}

export function Pricing() {
  return (
    <section className="relative bg-stone/30 py-12 md:py-20">
      <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-gold"></div>
            <span className="uppercase tracking-[0.2em] text-xs font-medium text-muted">Investment</span>
            <div className="h-[1px] w-8 bg-gold"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6"
          >
            Enter Before the <br />
            <span className="italic text-gold">Address Appreciates</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Price Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel relative overflow-hidden p-6 sm:p-8 group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
              <p className="text-sm uppercase tracking-widest text-muted mb-2">Current Opportunity</p>
              <div className="flex items-baseline gap-2">
                <CountUpRupee target={7199} className="font-serif text-4xl text-charcoal sm:text-5xl" />
                <span className="text-muted">/ sft</span>
              </div>
              <p className="text-sm text-charcoal/60 mt-4 font-light">Exclusive pre-launch pricing for early visionaries.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden bg-charcoal p-6 text-white sm:p-8"
            >
              <p className="text-sm uppercase tracking-widest text-white/60 mb-2">Projected Value</p>
              <div className="flex items-baseline gap-2">
                <CountUpRupee target={11000} delay={0.2} className="font-serif text-4xl text-gold sm:text-5xl" />
                <span className="text-white/60">/ sft</span>
              </div>
              <p className="text-sm text-white/60 mt-4 font-light">Estimated future potential based on Tellapur's growth corridor.</p>
            </motion.div>
          </div>

          {/* Graph & Stats */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-5 sm:p-8 md:p-12"
            >
              <div className="mb-8 flex flex-col gap-4 border-b border-stone pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <h4 className="mb-2 font-serif text-xl text-charcoal sm:text-2xl">Wealth Narrative</h4>
                  <p className="text-sm font-light text-muted">Tellapur Luxury Real Estate Index</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <span className="flex items-center gap-2 font-medium text-emerald-600">
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    +52%
                  </span>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted">Expected ROI</p>
                </div>
              </div>

              {/* Elegant Graph Representation */}
              <div className="relative h-48 w-full flex items-end justify-between pt-8">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full h-[1px] bg-stone/50"></div>
                  ))}
                </div>
                
                {/* Line Graph SVG */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M0,80 Q25,75 50,50 T100,20" 
                    fill="none" 
                    stroke="var(--color-gold)" 
                    strokeWidth="2"
                    className="drop-shadow-[0_4px_8px_rgba(201,168,106,0.3)]"
                  />
                  {/* Gradient under line */}
                  <motion.path 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    d="M0,80 Q25,75 50,50 T100,20 L100,100 L0,100 Z" 
                    fill="url(#gold-gradient)" 
                    className="opacity-20"
                  />
                  <defs>
                    <linearGradient id="gold-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-gold)" />
                      <stop offset="100%" stopColor="var(--color-warm-white)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Data Points */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-gold mb-2"></div>
                  <span className="text-xs text-muted font-medium">Launch</span>
                </div>
                <div className="relative z-10 flex flex-col items-center pb-8">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-gold mb-2"></div>
                  <span className="text-xs text-muted font-medium">Mid-way</span>
                </div>
                <div className="relative z-10 flex flex-col items-center pb-24">
                  <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_rgba(201,168,106,0.6)] mb-2"></div>
                  <span className="text-xs text-charcoal font-medium">Handover</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-stone pt-6 sm:grid-cols-3 sm:gap-4">
                <div className="text-center">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-gold" />
                  <p className="text-xs uppercase tracking-wider text-muted">RERA Approved</p>
                </div>
                <div className="text-center sm:border-l sm:border-r sm:border-stone sm:py-0">
                  <Clock className="mx-auto mb-3 h-6 w-6 text-gold" />
                  <p className="text-xs uppercase tracking-wider text-muted">On-Time Delivery</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="mx-auto mb-3 h-6 w-6 text-gold" />
                  <p className="text-xs uppercase tracking-wider text-muted">High Appreciation</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
