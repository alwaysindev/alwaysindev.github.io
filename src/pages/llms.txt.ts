/**
 * llms.txt (experimental): resumen del sitio para agentes y LLMs.
 * Se genera desde los mismos datos que el HTML para que nunca se desincronice.
 */
import { getPosts } from '../lib/posts';
import { SITE, BRAND, PERSON, PROFILES, employerLine } from '../config/site';
import { TALKS, TEACHING, PROJECTS, CERTIFICATIONS, isActive } from '../data/profile';

export async function GET() {
  const posts = await getPosts();
  const u = (p: string) => new URL(p, SITE.url).toString();

  const body = `# ${BRAND.name}

> ${BRAND.description} Creado por ${PERSON.name}, ${PERSON.tagline}

## Proyecto
- Nombre: ${BRAND.name} (cofundado por ${PERSON.shortName} y ${BRAND.cofounder.name})
- YouTube: ${BRAND.socials.youtube}
- GitHub: ${BRAND.socials.github}

## Sobre ${PERSON.shortName}
- ${employerLine()}
- Docencia: ${TEACHING.map((t) => `${t.org} (${t.role})`).join('; ')}
- Certificaciones vigentes: ${CERTIFICATIONS.filter((c) => isActive(c)).map((c) => `${c.name}, ${c.issuer}`).join('; ')}
- Eventos: ${TALKS.map((t) => t.event.split(' — ')[0]).join(', ')}
- Perfiles: ${Object.values(PROFILES).join(' , ')}

## Páginas
- [Inicio](${u('/')}): qué es ${BRAND.name}
- [Sobre mí](${u('/sobre-mi/')}): trayectoria, certificaciones y FAQ de ${PERSON.shortName}
- [Contenido](${u('/contenido/')}): vídeos y ${PROJECTS.length} repositorios abiertos
- [Formación](${u('/formacion/')}): experiencia docente y formación para equipos
- [Charlas](${u('/charlas/')}): catálogo e historial de charlas
- [Prensa](${u('/prensa/')}): bios y cómo citar
- [Sobre este sitio](${u('/sobre-este-sitio/')}): medidas de SEO y GEO aplicadas
${
    posts.length
      ? `\n## Blog\n${posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`).join('\n')}\n`
      : ''
  }`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
