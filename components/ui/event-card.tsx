import Image from "next/image";
import Link from "next/link";

export interface EventCardProps {
  image: string;
  name: string;
  tagline: string;
  is_free?: boolean;
  href?: string;
}

export function EventCard({ image, name, tagline, is_free, href }: EventCardProps) {
  const Card = (
    <div className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {is_free && (
          <span className="absolute top-2 left-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            Free
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{Card}</Link> : Card;
}
