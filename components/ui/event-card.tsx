import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  image: string;
  name: string;
  tagline: string;
  href?: string;
}

export function EventCard({ image, name, tagline, href }: EventCardProps) {
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
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{Card}</Link> : Card;
}
