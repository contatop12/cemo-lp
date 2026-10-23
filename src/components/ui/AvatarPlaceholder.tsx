// Silhueta cinza neutra para médicos ainda sem retrato (pedido da CEMO, 23/10/2026): ocupa o mesmo espaço da foto,
// sem inventar rosto nem iniciais. Decorativa — o nome do médico está sempre no texto ao lado.
export function AvatarPlaceholder({ className }: { className?: string }) {
  return (
    <svg data-avatar-placeholder="" viewBox="0 0 200 250" aria-hidden="true" focusable="false" className={className} preserveAspectRatio="xMidYMax meet">
      <circle cx="100" cy="92" r="42" fill="#B9C2CC" />
      <path d="M22 250c4-56 38-92 78-92s74 36 78 92Z" fill="#B9C2CC" />
    </svg>
  );
}
