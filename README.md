# alwaysindev.es

Web de **alwaysInDEV**, proyecto de divulgación técnica en español sobre IA, Data Science y programación creado por Alejandro Cárabe. Hecha con [Astro](https://astro.build) (HTML estático) y desplegada en GitHub Pages con GitHub Actions.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321 (muestra también los borradores del blog)
npm run build      # genera dist/
npm run validate   # comprueba h1, títulos, canonical, JSON-LD y enlaces internos de dist/
npm run check      # comprobación de tipos (requiere Node ≥ 20.19; en CI se usa Node 22)
npm run images     # regenera og-default.png, iconos y favicon.ico desde public/favicon.svg
```

## Dónde se cambia cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Datos del proyecto, redes, nombre, frase descriptiva | `src/config/site.ts` |
| Empleo actual (Luce IT / BBVA) y su fecha de inicio | `EMPLOYER` en `src/config/site.ts` |
| Experiencia, certificaciones, charlas, docencia, repos, FAQ | `src/data/profile.ts` |
| Artículos del blog | `src/content/posts/*.md` (`draft: true` = no se publica) |
| Estilos y colores | `src/styles/global.css` |
| JSON-LD | `src/lib/schema.ts` |
| Política de rastreadores | `public/robots.txt` |

### Reglas de contenido

- **Nada sin fuente.** Una charla solo pasa a `verified: true` (y entra en el JSON-LD como `Event`) con fecha y enlace público.
- Las certificaciones caducadas se muestran como caducadas y no van al JSON-LD.
- El JSON-LD solo describe lo que también se ve en la página.
- La `description` de cada página debe tener entre 70 y 170 caracteres; si no, el build falla.

## Despliegue

Cada push a `main` construye y publica en GitHub Pages (`.github/workflows/deploy.yml`). Las PR solo construyen y validan. En *Settings → Pages*, la fuente debe ser **GitHub Actions**. El dominio se define en `public/CNAME`.

Versión anterior (un único `index.html`): etiqueta `v0-legacy`.
