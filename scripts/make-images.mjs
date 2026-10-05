// Genera las imágenes estáticas de public/ a partir de SVG.
// Uso: node scripts/make-images.mjs  (vuelve a ejecutarlo si cambia la marca)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const out = (f) => new URL(`../public/${f}`, import.meta.url);
const favicon = await readFile(out('favicon.svg'));

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4ade80"/><stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#4ade80" stroke-opacity="0.06"/>
    </pattern>
    <radialGradient id="glow" cx="0.2" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#4ade80" stop-opacity="0.18"/><stop offset="1" stop-color="#4ade80" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#g)"/>
  <text x="80" y="150" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="40" font-weight="700">
    <tspan fill="#52525b">./</tspan><tspan fill="#a1a1aa">always</tspan><tspan fill="#52525b">In</tspan><tspan fill="#4ade80">DEV</tspan>
  </text>
  <text x="80" y="320" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="104" font-weight="800" fill="#e4e4e7" letter-spacing="-3">Data Science,</text>
  <text x="80" y="430" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="104" font-weight="800" fill="url(#g)" letter-spacing="-3">sin filtros.</text>
  <text x="80" y="540" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="30" fill="#a1a1aa">
    <tspan fill="#4ade80">$</tspan> IA · Data Science · programación — en español
  </text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('og-default.png').pathname.slice(1));
await sharp(favicon, { density: 600 }).resize(180, 180).png().toFile(out('apple-touch-icon.png').pathname.slice(1));
await sharp(favicon, { density: 600 }).resize(512, 512).png().toFile(out('icon-512.png').pathname.slice(1));

// favicon.ico con un PNG de 32x32 embebido (formato ICO válido desde Windows Vista).
const png32 = await sharp(favicon, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // tipo: icono
header.writeUInt16LE(1, 4); // nº de imágenes
header.writeUInt8(32, 6); // ancho
header.writeUInt8(32, 7); // alto
header.writeUInt8(0, 8); // paleta
header.writeUInt8(0, 9); // reservado
header.writeUInt16LE(1, 10); // planos
header.writeUInt16LE(32, 12); // bits por píxel
header.writeUInt32LE(png32.length, 14); // tamaño
header.writeUInt32LE(22, 18); // offset
await writeFile(out('favicon.ico'), Buffer.concat([header, png32]));

console.log('Imágenes generadas en public/');
