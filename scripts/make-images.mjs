// Genera las imágenes estáticas de public/ a partir del logo del canal.
// Uso: npm run images  (vuelve a ejecutarlo si cambia el logo o la marca)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));
const logo = await readFile(new URL('../src/assets/brand/logo-youtube.jpg', import.meta.url));

// Logo con esquinas redondeadas (como avatar de app) para iconos.
async function roundedLogo(size, radius) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
  );
  return sharp(logo).resize(size, size).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

// Imagen para redes sociales (Open Graph), 1200x630, versión clara.
const logoTile = await roundedLogo(240, 52);
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b4fb0"/><stop offset="1" stop-color="#e50055"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.05" cy="0.05" r="0.6">
      <stop offset="0" stop-color="#8b4fb0" stop-opacity="0.16"/><stop offset="1" stop-color="#8b4fb0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.95" cy="0.95" r="0.6">
      <stop offset="0" stop-color="#e50055" stop-opacity="0.14"/><stop offset="1" stop-color="#e50055" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#fbf9fc"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="0" y="0" width="1200" height="10" fill="url(#g)"/>
  <text x="80" y="150" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="40" font-weight="700" fill="#1a1320">alwaysInDEV</text>
  <text x="80" y="280" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="64" font-weight="800" fill="#1a1320" letter-spacing="-2">Ciencia de Datos e IA,</text>
  <text x="80" y="362" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="64" font-weight="800" fill="url(#g)" letter-spacing="-2">explicadas en español.</text>
  <text x="80" y="510" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="30" fill="#4a4054">Vídeos · Formación · Charlas · Código abierto</text>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: logoTile, left: 880, top: 195 }])
  .png({ compressionLevel: 9 })
  .toFile(out('og-default.png'));

await sharp(logo).resize(180, 180).png().toFile(out('apple-touch-icon.png'));
await writeFile(out('icon-192.png'), await roundedLogo(192, 42));
await writeFile(out('icon-512.png'), await roundedLogo(512, 112));

// favicon.ico con un PNG de 32x32 embebido (formato ICO válido desde Windows Vista).
const png32 = await roundedLogo(32, 7);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(out('favicon.ico'), Buffer.concat([header, png32]));

console.log('Imágenes generadas en public/');
