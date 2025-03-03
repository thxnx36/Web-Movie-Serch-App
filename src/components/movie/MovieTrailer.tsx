interface MovieTrailerProps {
  videoKey: string;
}

export default function MovieTrailer({ videoKey }: MovieTrailerProps) {
  if (!videoKey) return null;

  return (
    <div className="w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
        title="Movie Trailer"
        className="w-full h-full rounded-lg"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}