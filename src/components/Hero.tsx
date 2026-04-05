import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';

function HeroForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setStatus('loading');
    try {
      const [firstName, ...rest] = name.trim().split(' ');
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(' ') || '',
          email: '',
          phone,
          interest: 'EOI',
          message: 'Submitted via Hero EOI form',
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setName('');
      setPhone('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="font-serif text-xl text-charcoal">Thank You!</h3>
        <p className="mt-1 text-sm text-muted">We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="mb-2 font-serif text-xl text-charcoal sm:text-2xl">Request a EOI</h3>
      <p className="mb-5 text-sm text-muted sm:mb-6">Enter before the address appreciates.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-none border border-stone/50 bg-white/50 px-4 py-3 text-sm font-light transition-colors focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded-none border border-stone/50 bg-white/50 px-4 py-3 text-sm font-light transition-colors focus:border-gold focus:outline-none"
          />
        </div>
        {status === 'error' && (
          <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group flex w-full items-center justify-between bg-charcoal px-6 py-4 text-white transition-colors duration-500 hover:bg-gold disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <span className="text-xs font-medium tracking-wide">Submitting...</span>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <span className="text-xs font-medium tracking-wide">Register EOI Now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </>
  );
}

export function Hero() {
  return (
    <section
      id="hero-eoi"
      className="relative flex min-h-[100svh] w-full flex-col overflow-x-hidden md:h-[100svh] md:overflow-hidden"
    >
      {/* Background — full section height */}
      <motion.div
        className="absolute inset-0 h-full min-h-[100svh] w-full md:min-h-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <video
          className="h-full min-h-[50svh] w-full object-cover object-center md:h-full md:min-h-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/2000-x-1333-1024x682.png"
          aria-hidden={true}
        >
          <source src="/Hero%20Bg%20video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white/40 via-warm-white/20 to-warm-white/90 mix-blend-overlay" />
        <div className="absolute inset-0 bg-white/10" />
        {/* Stronger fade on mobile so stacked copy + form read clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-white/30 to-warm-white/85 md:hidden" />
      </motion.div>

      {/* Mobile: headline + tagline in flow (no overlap with form) */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pb-2 pt-20 sm:px-6 md:container md:px-12 md:pb-0 md:pt-0">
        <div className="flex min-h-0 flex-1 flex-col justify-start md:absolute md:inset-0 md:justify-center md:px-12">
          <div className="w-full max-w-full shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4"
            >
              <div className="h-px w-8 shrink-0 bg-gold md:w-12" aria-hidden />
              <span className="inline-block bg-gold/45 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal sm:px-6 sm:text-[11px] md:px-8 md:text-[13px]">
                THE SKY49 TELLAPUR
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-4 w-full max-w-4xl rounded-xl border border-white/25 bg-[#efe8d4]/22 px-4 py-3 shadow-[0_8px_32px_rgba(31,31,31,0.04)] backdrop-blur-xl sm:mb-5 sm:rounded-2xl sm:px-5 sm:py-4 md:mb-8 md:px-6 md:py-5"
            >
              <h1 className="text-balance font-serif text-4xl leading-[1.12] text-charcoal [text-shadow:0_1px_2px_rgba(255,255,255,0.55),0_0_1px_rgba(31,31,31,0.15)] sm:text-5xl md:text-7xl lg:text-8xl">
                Hyderabad’s Most <br className="hidden md:block" />
                <span className="italic text-gold">Elegant</span> Skyline
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-full text-base font-light leading-relaxed text-charcoal sm:text-lg md:mb-0 md:max-w-2xl md:text-xl"
            >
              <span className="box-decoration-clone bg-[#efe8d4]/95 px-1.5 py-1 [-webkit-box-decoration-break:clone]">
                Ultra-luxury 3 &amp; 4 BHK residences at Tellapur, crafted for prestige living, legacy wealth, and
                timeless appreciation.
              </span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* EOI form: stacked below copy on mobile; floating card on md+ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 mt-2 w-full px-4 pb-8 sm:px-6 md:absolute md:bottom-12 md:right-12 md:mt-0 md:w-[400px] md:max-w-[calc(100%-6rem)] md:rounded-2xl md:px-0 md:pb-0"
      >
        <div className="glass-panel rounded-t-2xl border border-white/60 p-6 shadow-xl sm:p-8 md:rounded-2xl md:border-white/50">
          <HeroForm />
        </div>
      </motion.div>

      {/* Scroll indicator — desktop only; hidden on mobile to avoid clash with form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-6 z-10 hidden flex-col items-center gap-4 md:left-12 md:flex"
      >
        <span className="origin-left translate-x-2 rotate-90 text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
          Scroll
        </span>
        <div className="relative h-16 w-[1px] overflow-hidden bg-charcoal/20">
          <motion.div
            className="absolute left-0 top-0 h-1/2 w-full bg-gold"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
