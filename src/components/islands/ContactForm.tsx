import { useState } from 'preact/hooks';

type Status = 'idle' | 'loading' | 'success' | 'error';

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    wantsBrochure: false,
  });
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: Event) => {
    const t = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const name = t.name;
    const type = (t as HTMLInputElement).type;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (t as HTMLInputElement).checked : t.value,
    }));
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone || !form.interest) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('fail');
      window.gtag_report_conversion?.();
      setStatus('success');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
        wantsBrochure: false,
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (status === 'success') {
    return (
      <div class="relative z-10 flex flex-col items-center justify-center py-16 text-center">
        <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          ✓
        </div>
        <h3 class="font-serif text-2xl text-charcoal">Thank you</h3>
        <p class="mt-2 text-muted">Our advisory desk will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form class="relative z-10 space-y-8" onSubmit={onSubmit}>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="space-y-2">
          <label class="text-[10px] font-medium uppercase tracking-widest text-muted">First name</label>
          <input
            name="firstName"
            value={form.firstName}
            onInput={onChange}
            required
            class="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
            placeholder="First name"
            autoComplete="given-name"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-medium uppercase tracking-widest text-muted">Last name</label>
          <input
            name="lastName"
            value={form.lastName}
            onInput={onChange}
            class="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
            placeholder="Last name"
            autoComplete="family-name"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="space-y-2">
          <label class="text-[10px] font-medium uppercase tracking-widest text-muted">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onInput={onChange}
            required
            class="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-medium uppercase tracking-widest text-muted">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onInput={onChange}
            required
            class="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
            placeholder="+91"
            autoComplete="tel"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-[10px] font-medium uppercase tracking-widest text-muted">Interested in</label>
        <select
          name="interest"
          value={form.interest}
          onChange={onChange}
          required
          class="w-full cursor-pointer appearance-none border-b border-stone bg-transparent pb-3 text-charcoal focus:border-gold focus:outline-none"
        >
          <option value="" disabled>
            Select residence type
          </option>
          <option value="3bhk">3 BHK luxury</option>
          <option value="4bhk">4 BHK premium</option>
          <option value="penthouse">Sky / upper formats</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="text-[10px] font-medium uppercase tracking-widest text-muted">Message (optional)</label>
        <textarea
          name="message"
          value={form.message}
          onInput={onChange}
          rows={3}
          class="w-full resize-none border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
          placeholder="Preferred call time, bank loan needs, etc."
        />
      </div>

      <div class="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="brochure"
          name="wantsBrochure"
          checked={form.wantsBrochure}
          onChange={onChange}
          class="h-5 w-5 rounded border border-stone accent-gold"
        />
        <label for="brochure" class="cursor-pointer text-sm text-charcoal">
          Send me the digital brochure
        </label>
      </div>

      {status === 'error' ? <p class="text-sm text-red-600">Something went wrong. Please try again.</p> : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gold hover:text-charcoal disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit inquiry'}
      </button>
    </form>
  );
}
