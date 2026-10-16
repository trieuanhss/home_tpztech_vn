const fs = require('fs');
const path = require('path');
const assert = require('assert');

const htmlPath = path.join(__dirname, '..', 'index.html');
console.log('Testing index.html validation...');

if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: index.html does not exist');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Required elements
assert(html.includes('id="app"'), 'Must have #app mount point');
assert(html.includes('vue.global.prod.js') || html.includes('vue@3'), 'Must load Vue 3 from CDN');
assert(html.includes('swiper-bundle.min.js'), 'Must load Swiper.js bundle from CDN');
assert(html.includes('swiper-bundle.min.css'), 'Must load Swiper.js CSS from CDN');
assert(html.includes('style.css'), 'Must link style.css');
assert(html.includes('app.js'), 'Must load app.js');
assert(html.includes('data-theme'), 'Must include anti-FOUC theme script');

// Semantic sections
assert(html.includes('id="home"'), 'Must have home section');
assert(html.includes('id="about"'), 'Must have about section');
assert(html.includes('id="services"'), 'Must have services section');
assert(html.includes('id="games"'), 'Must have games section');
assert(html.includes('id="tech-stack"'), 'Must have tech-stack section');
assert(html.includes('id="partners"'), 'Must have partners section');

// Swiper carousels
assert(html.includes('about-swiper'), 'Must have about swiper');
assert(html.includes('services-swiper'), 'Must have services swiper');
assert(html.includes('games-swiper'), 'Must have games swiper');
assert(html.includes('tech-swiper'), 'Must have tech swiper');
assert(html.includes('partners-swiper'), 'Must have partners swiper');

// Modal & toast
assert(html.includes('selectedGame'), 'Must have game modal bound to selectedGame');
assert(html.includes('toast.show'), 'Must have toast notification bound');

// Theme & Lang switches
assert(html.includes('selectTheme') || html.includes('setTheme'), 'Must have theme switch controls');
assert(html.includes('selectLang') || html.includes('setLang'), 'Must have language switch controls');

console.log('PASS: index.html markup and template bindings verified successfully!');
