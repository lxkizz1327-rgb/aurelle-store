import { Star } from "lucide-react";

export default function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={15} strokeWidth={1.5} className={n <= rating ? "fill-accent text-accent" : "text-line"} aria-hidden="true" />
      ))}
    </div>
  );
}
