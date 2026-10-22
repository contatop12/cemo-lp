// Texto livre vindo do navegador: quebras de linha/tabs viram espaço, demais caracteres de controle e < >
// são removidos, espaços colapsados, tamanho limitado.
export function sanitizeText(input: string, maxLength: number): string {
  return input
    .replace(/\s+/g, ' ')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/[<>]/g, '')
    .replace(/ {2,}/g, ' ')
    .trim()
    .slice(0, maxLength);
}
