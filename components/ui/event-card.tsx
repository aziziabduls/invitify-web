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
    <div className="group overflow-hidden rounded-[16px] bg-background text-foreground shadow-layered transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {is_free && (
          <span className="absolute top-4 left-4 rounded-full bg-background backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-foreground shadow-soft">
            Free Entry
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="cal-sans text-lg group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
        <p className="mt-2 text-xs font-medium text-muted-foreground line-clamp-2 leading-relaxed">{tagline}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{Card}</Link> : Card;
}
