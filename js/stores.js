// Enlaces de descarga. Cuando la app esté publicada, pon aquí las URLs y los
// botones se activan solos. Si alguien llega desde "Compartir" en la app,
// se le lleva directo a la tienda de su teléfono.
const STORES = {
  ios: '',      // p. ej. https://apps.apple.com/app/id0000000000
  android: '',  // https://play.google.com/store/apps/details?id=com.luiscaballero.muta
};

(function () {
  const ua = navigator.userAgent || '';
  const platform = /iPhone|iPad|iPod/.test(ua) ? 'ios' : /Android/.test(ua) ? 'android' : null;

  document.querySelectorAll('[data-store]').forEach((btn) => {
    const url = STORES[btn.dataset.store];
    if (!url) return;
    btn.href = url;
    btn.removeAttribute('aria-disabled');
    const label = btn.querySelector('span');
    if (label) label.textContent = btn.dataset.store === 'ios' ? 'Descargar en App Store' : 'Disponible en Google Play';
  });

  // Desde un enlace compartido (?ref=share): directo a la tienda del teléfono.
  const fromShare = new URLSearchParams(location.search).get('ref') === 'share';
  if (fromShare && platform && STORES[platform]) location.replace(STORES[platform]);
})();
