// Navegação com carregamento completo de página (não a do router do Next): o GTM do site atual dispara a
// conversão do Google Ads no page view de /obrigado/, e só um carregamento novo gera esse evento.
export function hardNavigate(path: string): void {
  window.location.assign(path);
}
