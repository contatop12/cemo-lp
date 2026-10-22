import type { Testimonial } from '@/content/types';
import { StarIcon } from './icons';

// Avaliação real, copiada da fonte sem alterar o sentido (nunca gerada).
export function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const date = new Date(`${testimonial.date}T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return (
    <figure className="flex h-full flex-col rounded-lg border border-borda bg-papel p-6">
      <div aria-label={`${testimonial.rating} de 5 estrelas`} className="flex text-[#B07A00]">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < testimonial.rating} className="size-5" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1">
        <p>“{testimonial.text}”</p>
      </blockquote>
      <figcaption className="mt-4 text-small text-tinta-suave">
        <span className="font-bold text-tinta">{testimonial.author}</span> · avaliação no{' '}
        <a href={testimonial.sourceUrl} rel="noopener noreferrer" target="_blank" className="text-azul-700 underline">
          Google
        </a>
        , {date}
      </figcaption>
    </figure>
  );
}
