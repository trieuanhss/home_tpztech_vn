const http = require('http');
const assert = require('assert');

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:8088${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Running End-to-End Server & Asset Validation...');

  // 1. Index
  const indexRes = await fetchUrl('/');
  assert.strictEqual(indexRes.status, 200, 'index.html must return 200');
  assert(indexRes.body.includes('Công ty TNHH TPZTech Studio'), 'HTML must contain company name');
  assert(indexRes.body.includes('id="app"'), 'HTML must contain #app');

  // 2. Config JSON
  const configRes = await fetchUrl('/config.json');
  assert.strictEqual(configRes.status, 200, 'config.json must return 200');
  const config = JSON.parse(configRes.body);
  assert.strictEqual(config.company.name.vi, 'Công ty TNHH TPZTech Studio');
  assert.strictEqual(config.company.address.vi, 'Thành Phố Đồng Nai, Việt Nam');
  assert(config.upcomingGames.length >= 4, 'Must have at least 4 upcoming games');

  // 3. Style CSS
  const cssRes = await fetchUrl('/style.css');
  assert.strictEqual(cssRes.status, 200, 'style.css must return 200');
  assert(cssRes.body.includes('liquid-glass'), 'CSS must include liquid-glass');
  assert(cssRes.body.includes('[data-theme="light"]'), 'CSS must include light theme');

  // 4. App JS
  const jsRes = await fetchUrl('/app.js');
  assert.strictEqual(jsRes.status, 200, 'app.js must return 200');
  assert(jsRes.body.includes('createApp'), 'app.js must include Vue createApp');

  // 5. Assets
  const assets = [
    '/assets/logo.svg',
    '/assets/game-chrono-blade.svg',
    '/assets/game-cyber-vanguard.svg',
    '/assets/game-sky-realms.svg',
    '/assets/game-shadow-dominion.svg'
  ];
  for (const assetPath of assets) {
    const assetRes = await fetchUrl(assetPath);
    assert.strictEqual(assetRes.status, 200, `${assetPath} must return 200`);
    assert(assetRes.body.includes('<svg'), `${assetPath} must be valid SVG`);
  }

  console.log('PASS: All End-to-End static server endpoints and visual assets are verified and working!');
}

run().catch(err => {
  console.error('FAIL in E2E Verification:', err);
  process.exit(1);
});
