const fs = require('fs');
const path = require('path');
const assert = require('assert');

const cssPath = path.join(__dirname, '..', 'style.css');
console.log('Testing style.css validation...');

if (!fs.existsSync(cssPath)) {
  console.error('FAIL: style.css does not exist');
  process.exit(1);
}

const css = fs.readFileSync(cssPath, 'utf8');

// Required theme selectors
assert(css.includes(':root') || css.includes('[data-theme="dark"]'), 'Must define dark theme');
assert(css.includes('[data-theme="light"]'), 'Must define [data-theme="light"]');

// Required Liquid Glass tokens
assert(css.includes('backdrop-filter') && css.includes('-webkit-backdrop-filter'), 'Must include backdrop-filter and webkit prefix');
assert(css.includes('--bg-primary'), 'Must define --bg-primary token');
assert(css.includes('--text-primary'), 'Must define --text-primary token');
assert(css.includes('--glass-bg'), 'Must define --glass-bg token');
assert(css.includes('--glass-border'), 'Must define --glass-border token');

// Required component classes
const requiredClasses = [
  '.liquid-nav',
  '.liquid-glass',
  '.liquid-card',
  '.liquid-btn-primary',
  '.hero-section',
  '.game-card',
  '.coming-badge',
  '.modal-overlay',
  '.modal-content',
  '.custom-dropdown',
  '.dropdown-trigger-btn',
  '.carousel-nav-bar',
  '.toast-notification'
];

requiredClasses.forEach(cls => {
  assert(css.includes(cls), `style.css is missing class: ${cls}`);
});

// Responsive checks
assert(css.includes('@media (max-width: 768px)'), 'Must include mobile responsive media query');

console.log('PASS: style.css contains all required design tokens, themes, and Apple Liquid Glass classes!');
