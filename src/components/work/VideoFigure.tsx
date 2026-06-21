export default function VideoFigure({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  return (
    <figure className="mt-12">
      <figcaption className="mb-3.5 flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
        {title} <span className="h-px flex-1 bg-line" />
      </figcaption>
      <div className="overflow-hidden rounded-xl border border-line bg-black shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
        <video
          controls
          preload="metadata"
          poster={poster}
          aria-label={`${title} demo video`}
          className="block h-auto w-full"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <p className="mt-2.5 font-mono text-[12px] text-muted">{"// product demo · click to play"}</p>
    </figure>
  );
}
