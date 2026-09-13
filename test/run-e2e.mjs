/* Builds nothing: serves the existing dist/ and drives it in headless Chrome. */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\//, '');
const PORT = 5199;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

const server = createServer(async (req, res) => {
  let path = req.url.split('?')[0];
  try {
    if (path === '/e2e.html') {
      let html = await readFile(join(DIST, 'index.html'), 'utf8');
      html = html.replace('</body>', '<script src="/e2e.js"></script></body>');
      res.writeHead(200, { 'content-type': 'text/html' });
      return res.end(html);
    }
    if (path === '/e2e.js') {
      const js = await readFile(new URL('./e2e.js', import.meta.url), 'utf8');
      res.writeHead(200, { 'content-type': 'text/javascript' });
      return res.end(js);
    }
    if (path === '/') path = '/index.html';
    const body = await readFile(join(DIST, path.slice(1)));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const chrome = process.env.CHROME ||
  'C:/Program Files/Google/Chrome/Application/chrome.exe';

const dom = await new Promise((resolve, reject) => {
  const args = ['--headless', '--disable-gpu', '--no-sandbox',
    '--virtual-time-budget=30000', '--dump-dom', `http://127.0.0.1:${PORT}/e2e.html`];
  const proc = spawn(chrome, args);
  let buf = '';
  proc.stdout.on('data', (d) => { buf += d; });
  proc.on('error', reject);
  proc.on('close', () => resolve(buf));
});

server.close();

const m = dom.match(/<pre id="e2e-out">([\s\S]*?)<\/pre>/);
if (!m) {
  console.error('no test output captured - the page did not finish');
  process.exit(1);
}
const text = m[1]
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
console.log(text);

const failures = (text.match(/FAIL|THREW/g) || []).length;
console.log(`\n${failures === 0 ? 'all checks passed' : failures + ' failing check(s)'}`);
process.exit(failures ? 1 : 0);
