import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function HeroImage({ src, alt, priority = true }: HeroImageProps) {
  return (
    <figure className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#D9D1C7] shadow-sm mb-10 bg-[#E2DCD3]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
        className="object-cover"
      />
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
