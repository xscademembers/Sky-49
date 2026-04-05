import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail, Check, Loader2 } from 'lucide-react';

export function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    wantsBrochure: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone || !form.interest) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', phone: '', interest: '', message: '', wantsBrochure: false });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-stone/10 py-12 md:py-20 scroll-mt-24"
      id="contact"
    >
      <div className="container relative z-10 mx-auto max-w-full px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Inquire</span>
            </div>

            <h2 className="mb-8 text-balance font-serif text-4xl leading-tight text-charcoal md:text-5xl lg:text-6xl">
              Register Your <br />
              <span className="italic text-gold">Interest</span>
            </h2>

            <p className="mb-12 max-w-md text-lg font-light leading-relaxed text-muted">
              Connect with our private client advisory team to schedule a bespoke tour of THE SKY49 or request
              detailed floor plans and pricing.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone bg-white shadow-sm">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-muted">Direct Line</p>
                  <a
                    href="tel:+918790066990"
                    className="text-lg font-medium text-charcoal transition-colors hover:text-gold"
                  >
                    +91 8790066990
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone bg-white shadow-sm">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-muted">Email Advisory</p>
                  <a
                    href="mailto:sales@thesky49.com"
                    className="text-lg font-medium text-charcoal transition-colors hover:text-gold"
                  >
                    sales@thesky49.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-[2rem] border border-stone/30 bg-white p-6 shadow-2xl sm:p-8 md:p-12"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-stone/50 blur-3xl" />

            {status === 'success' ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 font-serif text-2xl text-charcoal">Thank You!</h3>
                <p className="text-muted">Your inquiry has been submitted. Our team will reach out shortly.</p>
              </div>
            ) : (
              <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                      placeholder="+91 8790066990"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Interested In</label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer appearance-none border-b border-stone bg-transparent pb-3 text-charcoal focus:border-gold focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Residence Type
                    </option>
                    <option value="3bhk">3 BHK Luxury</option>
                    <option value="4bhk">4 BHK Premium</option>
                    <option value="penthouse">Sky Penthouse</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                    placeholder="How can we assist you?"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="downloadBrochure"
                      name="wantsBrochure"
                      checked={form.wantsBrochure}
                      onChange={handleChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-stone transition-colors checked:border-gold checked:bg-gold"
                    />
                    <svg
                      className="pointer-events-none absolute left-1 top-1 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L4.5 8.5L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <label htmlFor="downloadBrochure" className="cursor-pointer select-none text-sm text-charcoal">
                    I would like to receive the digital brochure
                  </label>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-charcoal px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-gold disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      Submitting
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
