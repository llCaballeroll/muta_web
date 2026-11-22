// MUTA: botón de descarga inteligente.
// La página funciona completa sin este archivo; solo ajusta enlaces según el teléfono.
(function () {
  var STORES = {
    ios: 'https://apps.apple.com/us/app/muta-gira-y-muta/id6829237403',
    android: 'https://play.google.com/store/apps/details?id=com.luiscaballero.muta'
  };

  var ua = navigator.userAgent || '';
  var isAndroid = /android/i.test(ua);
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var mine = isIOS ? STORES.ios : isAndroid ? STORES.android : '';

  // Desde "Compartir" en la app (?ref=share): directo a la tienda del teléfono.
  if (mine && new URLSearchParams(location.search).get('ref') === 'share') {
    location.replace(mine);
    return;
  }

  // "Descargar" lleva directo a la tienda del teléfono; en computadora baja a las insignias.
  if (mine) {
    document.querySelectorAll('[data-smart-download]').forEach(function (btn) {
      btn.href = mine; btn.target = '_blank'; btn.rel = 'noopener';
    });
  }

  // En Android, Google Play va primero.
  if (isAndroid) {
    document.querySelectorAll('.stores').forEach(function (row) {
      var play = row.querySelector('[data-store="android"]');
      if (play) row.prepend(play);
    });
  }
})();
