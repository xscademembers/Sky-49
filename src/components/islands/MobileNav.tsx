import { useState } from 'preact/hooks';

type Link = { href: string; label: string };

export default function MobileNav({
  links,
  phone,
}: {
  links: Link[];
  phone: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div class="flex items-center gap-2 lg:hidden">
      <a
        href={`tel:${phone}`}
        class="rounded-full border border-stone/50 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal"
      >
        Call
      </a>
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/50 bg-white text-charcoal shadow-sm"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <span class="sr-only">Toggle menu</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
          )}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          class="fixed inset-x-0 top-[57px] z-50 border-b border-stone/40 bg-warm-white/98 px-4 py-6 shadow-lg backdrop-blur-md"
        >
          <ul class="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  class="block py-2 text-sm font-medium uppercase tracking-widest text-charcoal"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#contact"
                class="mt-2 block rounded-full bg-charcoal py-3 text-center text-xs font-semibold uppercase tracking-widest text-white"
                onClick={() => setOpen(false)}
              >
                Book free site visit
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
