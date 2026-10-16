const fs = require('fs');
const path = require('path');
const assert = require('assert');

const configPath = path.join(__dirname, '..', 'config.json');

console.log('Testing config.json validation...');

if (!fs.existsSync(configPath)) {
  console.error('FAIL: config.json does not exist');
  process.exit(1);
}

let config;
try {
  const raw = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(raw);
} catch (e) {
  console.error('FAIL: config.json is not valid JSON:', e.message);
  process.exit(1);
}

function checkBilingual(obj, fieldName) {
  assert(obj, `${fieldName} is missing`);
  assert(typeof obj.vi === 'string' && obj.vi.trim().length > 0, `${fieldName}.vi is missing or empty`);
  assert(typeof obj.en === 'string' && obj.en.trim().length > 0, `${fieldName}.en is missing or empty`);
}

// 1. Company check
assert(config.company, 'config.company is missing');
checkBilingual(config.company.name, 'company.name');
assert(config.company.name.vi.includes('Công ty TNHH TPZTech Studio'), 'company.name.vi must match');
checkBilingual(config.company.address, 'company.address');
assert(config.company.address.vi.includes('Việt Nam'), 'company.address.vi must specify Việt Nam');
assert(config.company.email, 'company.email is missing');
assert(config.company.hotline, 'company.hotline is missing');

// 2. Navigation
assert(Array.isArray(config.navigation) && config.navigation.length >= 4, 'navigation items missing');
config.navigation.forEach((item, idx) => {
  assert(item.id, `nav[${idx}].id is missing`);
  checkBilingual(item.label, `nav[${idx}].label`);
});

// 3. Hero
assert(config.hero, 'hero section is missing');
checkBilingual(config.hero.badge, 'hero.badge');
checkBilingual(config.hero.titlePart1, 'hero.titlePart1');
checkBilingual(config.hero.titleHighlight, 'hero.titleHighlight');
checkBilingual(config.hero.description, 'hero.description');
assert(Array.isArray(config.hero.trustMetrics) && config.hero.trustMetrics.length === 4, 'hero.trustMetrics must have 4 items');
config.hero.trustMetrics.forEach((m, idx) => {
  assert(m.value, `metric[${idx}].value missing`);
  checkBilingual(m.label, `metric[${idx}].label`);
});

// 4. About (Vision, Mission, Philosophy)
assert(config.about, 'about section missing');
checkBilingual(config.about.tag, 'about.tag');
checkBilingual(config.about.title, 'about.title');
assert(Array.isArray(config.about.pillars) && config.about.pillars.length === 3, 'about.pillars must have 3 items');
config.about.pillars.forEach((p, idx) => {
  checkBilingual(p.title, `pillar[${idx}].title`);
  checkBilingual(p.description, `pillar[${idx}].description`);
});

// 5. Services
assert(Array.isArray(config.services) && config.services.length >= 3, 'services must have >= 3 items');
config.services.forEach((s, idx) => {
  checkBilingual(s.title, `service[${idx}].title`);
  checkBilingual(s.description, `service[${idx}].description`);
});

// 6. Upcoming Games
assert(Array.isArray(config.upcomingGames) && config.upcomingGames.length >= 3, 'upcomingGames must have >= 3 items');
config.upcomingGames.forEach((g, idx) => {
  assert(g.id, `game[${idx}].id missing`);
  checkBilingual(g.title, `game[${idx}].title`);
  checkBilingual(g.genre, `game[${idx}].genre`);
  checkBilingual(g.badgeText, `game[${idx}].badgeText`);
  checkBilingual(g.expectedRelease, `game[${idx}].expectedRelease`);
  checkBilingual(g.shortDesc, `game[${idx}].shortDesc`);
  checkBilingual(g.fullDesc, `game[${idx}].fullDesc`);
  assert(Array.isArray(g.platforms) && g.platforms.length > 0, `game[${idx}].platforms missing`);
});

// 7. Tech Stack
assert(Array.isArray(config.techStack) && config.techStack.length >= 4, 'techStack must have >= 4 items');

// 8. Strategic Partners
assert(config.strategicPartnersSection, 'strategicPartnersSection missing');
checkBilingual(config.strategicPartnersSection.title, 'strategicPartnersSection.title');
assert(Array.isArray(config.strategicPartners) && config.strategicPartners.length >= 1, 'strategicPartners must have >= 1 items');
assert.strictEqual(config.strategicPartners[0].name, 'TPZ-GameStudio', 'First partner must be TPZ-GameStudio');

// 9. Footer
assert(config.footer, 'footer section missing');
checkBilingual(config.footer.copyright, 'footer.copyright');

console.log('PASS: config.json validation succeeded with all required bilingual fields!');
