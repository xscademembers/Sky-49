import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.div 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4"
    >
      <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl border border-white/50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted">Starting From</span>
          <span className="font-serif text-lg text-charcoal leading-none">₹7,199/sft</span>
        </div>
        <div className="w-[1px] h-8 bg-stone"></div>
        <button
          type="button"
          onClick={() => document.getElementById('hero-eoi')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="text-sm font-medium uppercase tracking-wider text-charcoal transition-colors hover:text-gold"
        >
          Inquire Now
        </button>
      </div>

      <button className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
        <MessageCircle className="w-6 h-6" />
      </button>
    </motion.div>
  );
}
