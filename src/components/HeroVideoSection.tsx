/** Section under the hero — single YouTube embed, constrained width. */
const YOUTUBE_EMBED_ID = 'I5DbiUkT05M';

export function HeroVideoSection() {
  return (
    <section className="relative w-full bg-warm-white py-10 md:py-12" aria-label="Featured video">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden
      />

      <h2 className="sr-only">Featured project video</h2>

      <div className="mx-auto w-full max-w-3xl px-4 sm:max-w-4xl sm:px-6 lg:max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-stone/40 shadow-xl ring-1 ring-black/5">
          <div className="relative aspect-video w-full bg-charcoal">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_EMBED_ID}?rel=0&modestbranding=1`}
              title="THE SKY49 — featured video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
