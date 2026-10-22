import { assets } from '@/content/assets';

// <img> simples: SVG estático, sem otimização de imagem. Dimensões explícitas evitam CLS.
// A variante branca só deve ser usada sobre azul-profundo.
export function Logo({
  variant = 'color',
  className,
  height = 48,
  priority = false,
}: {
  variant?: 'color' | 'white';
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const asset = (variant === 'white' ? assets.logoSvgWhite : assets.logoSvg) ?? assets.logoPng;
  const width = Math.round((height * asset.width) / asset.height);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={asset.alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
