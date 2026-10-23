import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

// Moldura única dos retratos recortados: campo névoa, topo em arco (a pálpebra do logo) e anéis finos ao fundo.
// Todos os médicos aparecem no mesmo campo de cor e no mesmo recorte — coesão sem retoque.
export function PortraitFrame({ children, size = 'md', className }: { children: ReactNode; size?: 'md' | 'lg'; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[4/5] overflow-hidden bg-nevoa-2',
        size === 'lg' ? 'rounded-t-[45%_32%] rounded-b-lg' : 'rounded-t-[45%_30%] rounded-b-md',
        className,
      )}
    >
      <svg viewBox="0 0 200 250" aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full">
        {[34, 52, 68, 82, 94].map((r) => (
          <circle key={r} cx="100" cy="96" r={r} fill="none" className="stroke-azul-cemo" strokeOpacity={0.12} strokeWidth={0.8} />
        ))}
      </svg>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
