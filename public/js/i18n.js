// public/js/i18n.js

const LANGS = ['es', 'en', 'fr', 'de']; // idiomas disponibles
const DEFAULT_LANG = 'es';           // idioma por defecto
const switcher = document.getElementById('lang-switcher');

// Renderiza la "ruedita" de idiomas en la navbar
function renderLangSwitcher(current) {
  if (!switcher) return;
  switcher.innerHTML = LANGS.map(l =>
    `<span onclick="setLang('${l}')" class="${l === current ? 'active' : ''}">${l.toUpperCase()}</span>`
  ).join('');
}

// Función principal: carga el JSON del idioma y reemplaza los textos
async function load(lang) {
  try {
    const res = await fetch(`json/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (data[key]) el.innerHTML = data[key];
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    renderLangSwitcher(lang);

  } catch (e) {
    console.error("Error cargando el idioma:", e);
  }
}

// Cambiar idioma desde la ruedita
function setLang(lang) {
  if (LANGS.includes(lang)) load(lang);
}

// 🚀 Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
  load(savedLang);
});
