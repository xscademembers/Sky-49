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
      className="fixed left-1/2 z-50 flex w-[calc(100%-1.25rem)] max-w-md -translate-x-1/2 flex-wrap items-center justify-center gap-2 sm:w-auto sm:max-w-none sm:flex-nowrap sm:gap-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="glass-panel flex min-w-0 items-center gap-3 rounded-full border border-white/50 px-4 py-2.5 shadow-2xl sm:gap-6 sm:px-6 sm:py-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted">Starting From</span>
          <span className="font-serif text-lg text-charcoal leading-none">₹7,199/sft</span>
        </div>
        <div className="hidden h-8 w-px bg-stone sm:block" />
        <button
          type="button"
          onClick={() => document.getElementById('hero-eoi')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="text-sm font-medium uppercase tracking-wider text-charcoal transition-colors hover:text-gold"
        >
          Inquire Now
        </button>
      </div>

      <button
        type="button"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-105 sm:h-14 sm:w-14"
        aria-label="Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </motion.div>
  );
}
