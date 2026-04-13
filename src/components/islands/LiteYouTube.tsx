import { useState } from 'preact/hooks';

export default function LiteYouTube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [play, setPlay] = useState(false);
  const poster = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div class="relative aspect-video w-full overflow-hidden rounded-2xl border border-stone/40 bg-charcoal shadow-lg">
      {play ? (
        <iframe
          title={title}
          class="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          class="group relative block h-full w-full"
          onClick={() => setPlay(true)}
        >
          <img
            src={poster}
            alt=""
            class="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            width={1280}
            height={720}
            decoding="async"
            fetchpriority="low"
          />
          <span class="sr-only">Play video: {title}</span>
          <span
            class="absolute inset-0 flex items-center justify-center bg-charcoal/10 transition group-hover:bg-charcoal/20"
            aria-hidden="true"
          >
            <span class="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-2 ring-gold/40">
              <svg width="28" height="28" viewBox="0 0 24 24" class="ml-1 text-charcoal" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
