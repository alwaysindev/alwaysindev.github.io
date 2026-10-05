// Valida el sitio generado en dist/: un h1 por página, title/description/canonical,
// JSON-LD parseable y enlaces internos sin romper. Sale con código 1 si algo falla.
// Uso: npm run build && npm run validate
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = 'dist';
const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(root);
const exists = (href) => {
  const clean = decodeURIComponent(href.split('?')[0]);
  return (
    existsSync(join(root, clean)) && statSync(join(root, clean)).isFile()
  ) || existsSync(join(root, clean, 'index.html'));
};
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const problems = [];
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const rel = '/' + relative(root, f).split(sep).join('/');
  const s = readFileSync(f, 'utf8');
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  const title = decode(s.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const desc = decode(s.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const canonical = s.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const types = [];
  for (const [, json] of s.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      for (const n of JSON.parse(json)['@graph']) types.push(n['@type']);
    } catch (e) {
      problems.push(`${rel}: JSON-LD inválido (${e.message})`);
    }
  }
  console.log(`${rel.padEnd(34)} h1=${h1} title=${String(title.length).padStart(2)} desc=${desc.length} ld=[${types.join(', ')}]`);
  if (h1 !== 1) problems.push(`${rel}: ${h1} h1`);
  if (title.length > 70) problems.push(`${rel}: title de ${title.length} caracteres`);
  if (!canonical) problems.push(`${rel}: sin canonical`);
  for (const [, href] of s.matchAll(/href="(\/[^"#]*)/g)) {
    if (!exists(href)) problems.push(`${rel}: enlace roto ${href}`);
  }
}

if (problems.length) {
  console.error('\nProblemas:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log('\nOK: sin problemas.');
