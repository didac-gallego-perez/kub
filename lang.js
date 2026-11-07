// Muestra la página en español o inglés según el navegador, con botones para cambiar.
(function () {
  function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-content]').forEach(function (el) {
      el.hidden = el.getAttribute('data-content') !== lang;
    });
    document.querySelectorAll('[data-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('kub-lang', lang); } catch (e) { /* sin almacenamiento */ }
  }

  var saved = null;
  try { saved = localStorage.getItem('kub-lang'); } catch (e) { /* sin almacenamiento */ }
  var fromUrl = new URLSearchParams(location.search).get('lang');
  var browser = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  setLang(fromUrl === 'es' || fromUrl === 'en' ? fromUrl : saved || browser);

  document.querySelectorAll('[data-lang]').forEach(function (button) {
    button.addEventListener('click', function () { setLang(button.getAttribute('data-lang')); });
  });
})();
