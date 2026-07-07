# Healthy Habits

Vite + React + TypeScript app, deployed to GitHub Pages (base path `/healthy-habits/`).

## Verifying UI changes

Playwright is a dev dependency (`npx playwright install chromium` once per machine to
fetch the browser binary). To visually check a change:

```bash
npm run dev -- --port 5183 &
for i in $(seq 1 20); do curl -sf http://localhost:5183/healthy-habits/ >/dev/null && break; sleep 0.5; done

node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5183/healthy-habits/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/check.png', fullPage: true });
  await browser.close();
})();
"
```

Then read the screenshot back with the Read tool. Kill the dev server after
(`pkill -f 'vite.*5183'`) — it doesn't exit on its own.

`chromium-cli` (a browser-driving REPL some Claude Code environments have baked in) is
not available here — use Playwright directly as above instead of trying to install it.
