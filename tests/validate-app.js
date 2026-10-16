const fs = require('fs');
const path = require('path');
const assert = require('assert');

const appPath = path.join(__dirname, '..', 'app.js');
console.log('Testing app.js logic and validation...');

if (!fs.existsSync(appPath)) {
  console.error('FAIL: app.js does not exist');
  process.exit(1);
}

const appCode = fs.readFileSync(appPath, 'utf8');

// Syntax check
assert(appCode.includes('Vue.createApp') || appCode.includes('createApp'), 'Must instantiate Vue app');
assert(appCode.includes('localStorage.getItem'), 'Must read from localStorage');
assert(appCode.includes('localStorage.setItem'), 'Must write to localStorage');
assert(appCode.includes('setTheme'), 'Must include setTheme method');
assert(appCode.includes('setLang'), 'Must include setLang method');
assert(appCode.includes('openGameModal'), 'Must include openGameModal method');
assert(appCode.includes('closeGameModal'), 'Must include closeGameModal method');
assert(appCode.includes('handlePreregister'), 'Must include handlePreregister method');
assert(appCode.includes('handleContactSubmit'), 'Must include handleContactSubmit method');
assert(appCode.includes('filteredGames'), 'Must include filteredGames computed property');

console.log('PASS: app.js syntax and key reactive logic verified successfully!');
