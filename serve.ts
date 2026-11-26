// A small local server for the site's app/ folder (Node 22, standard library only).
// Start it with `node serve.ts` and open http://localhost:8080 — add
// `--port <number>` to listen elsewhere. It only serves files inside app/,
// answers with the right content type, and is a local convenience, not a
// server for the open internet.
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const folder = resolve(fileURLToPath(new URL('./app', import.meta.url)));
const flags = process.argv.slice(2);
const at = flags.indexOf('--port');
const wanted = at === -1 ? 8080 : Number(flags[at + 1]);
const listenOn = Number.isInteger(wanted) && wanted > 0 && wanted < 65536 ? wanted : 8080;

const KINDS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

createServer((incoming, outgoing) => {
  const target = new URL(incoming.url ?? '/', 'http://localhost');
  let rel;
  try {
    rel = decodeURIComponent(target.pathname);
  } catch {
    outgoing.writeHead(400);
    outgoing.end('bad request');
    return;
  }
  if (rel.endsWith('/')) rel += 'index.html';
  const picked = resolve(join(folder, normalize(rel)));
  if (picked !== folder && !picked.startsWith(folder + sep)) {
    outgoing.writeHead(403);
    outgoing.end('forbidden');
    return;
  }
  let info;
  try {
    info = statSync(picked);
    if (!info.isFile()) throw new Error('not a file');
  } catch {
    outgoing.writeHead(404);
    outgoing.end('not found');
    return;
  }
  outgoing.writeHead(200, {
    'content-type': KINDS[extname(picked).toLowerCase()] ?? 'application/octet-stream',
    'content-length': info.size,
    'cache-control': 'no-store',
  });
  createReadStream(picked).pipe(outgoing);
}).listen(listenOn, '127.0.0.1', () => {
  console.log('app/ is on http://localhost:' + listenOn);
});
