/**
 * Única fuente de verdad del sitio.
 * Todo lo que aparece en el HTML, el JSON-LD, llms.txt y el feed sale de aquí
 * o de src/data/. Si un dato cambia (empleo, redes, charlas), se cambia aquí.
 */

export const SITE = {
  url: 'https://alwaysindev.es',
  /** La marca principal del sitio es el proyecto; Alejandro aparece como creador. */
  name: 'alwaysInDEV',
  lang: 'es',
  locale: 'es_ES',
  defaultOgImage: '/og-default.png',
  /** Fecha de la última revisión de los datos personales (se muestra como "Actualizado"). */
  lastReviewed: '2026-10-05',
} as const;

export const PERSON = {
  id: `${SITE.url}/#alejandro`,
  name: 'Alejandro Cárabe Arranz',
  shortName: 'Alejandro Cárabe',
  givenName: 'Alejandro',
  familyName: 'Cárabe Arranz',
  initials: 'AC',
  city: 'Madrid',
  country: 'ES',
  /** Frase descriptiva canónica. Usar la MISMA en LinkedIn, GitHub, Sessionize y YouTube. */
  tagline: 'AI Engineer y Data Scientist en Madrid. Formador en Data Science, IA y Claude, y ponente técnico.',
  roles: ['AI Engineer', 'Data Scientist', 'Docente', 'Ponente'],
  /** Email público de contacto. null = no se muestra (pendiente de decidir cuál publicar). */
  email: null as string | null,
  /** Ruta a una foto en /public. null = se usa el avatar con iniciales. */
  headshot: null as string | null,
  knowsAbout: [
    'Inteligencia artificial generativa',
    'Generative Engine Optimization (GEO)',
    'Large Language Models',
    'Claude',
    'Claude Code',
    'Data Science',
    'Machine Learning',
    'Python',
    'SQL',
    'Web scraping',
    'Scrapy',
    'Data Engineering',
    'Azure AI',
    'Snowflake',
  ],
  education: [
    'Máster en Data Engineering, Cloud & Big Data',
    'Doble Grado en Marketing y Administración y Dirección de Empresas (ADE)',
  ],
} as const;

/**
 * Empleo principal.
 * - `disclose: false` oculta Luce IT/BBVA en todo el sitio.
 * - Mientras `startDate` sea null (o futura), el sitio dice "se incorpora" y
 *   el JSON-LD mantiene `worksFor` = empleo anterior. Al poner la fecha y
 *   reconstruir, pasa automáticamente a empleo actual.
 */
export const EMPLOYER = {
  disclose: true,
  title: 'AI Engineer',
  company: 'Luce IT',
  companyUrl: 'https://luceit.com/',
  client: 'BBVA',
  startDate: '2026-10' as string | null, // 'AAAA-MM' o 'AAAA-MM-DD'
  previous: { title: 'Data Scientist', company: 'IO Investigación' },
} as const;

export function employerStatus(now = new Date()): 'current' | 'incoming' | 'hidden' {
  if (!EMPLOYER.disclose) return 'hidden';
  if (EMPLOYER.startDate && new Date(EMPLOYER.startDate) <= now) return 'current';
  return 'incoming';
}

/** Frase de empleo para el hero y la bio, coherente con employerStatus(). */
export function employerLine(): string {
  const s = employerStatus();
  if (s === 'current') {
    return `${EMPLOYER.title} en ${EMPLOYER.company}, para el cliente ${EMPLOYER.client}.`;
  }
  if (s === 'incoming') {
    return `Se incorpora a ${EMPLOYER.company} como ${EMPLOYER.title}, para el cliente ${EMPLOYER.client}.`;
  }
  return `${EMPLOYER.previous.title} en ${EMPLOYER.previous.company}.`;
}

/** Perfiles verificados (HTTP 200 el 2026-10-05). Solo estas URLs pueden ir a `sameAs`. */
export const PROFILES = {
  linkedin: 'https://www.linkedin.com/in/alejandro-c%C3%A1rabe-arranz-703119221/',
  sessionize: 'https://sessionize.com/alejandro-carabe-arranz',
} as const;

export const BRAND = {
  id: `${SITE.url}/#alwaysindev`,
  name: 'alwaysInDEV',
  description:
    'Proyecto de divulgación técnica en español sobre IA, Data Science y programación: vídeos, formación, charlas y código abierto.',
  tagline: 'Ciencia de Datos, IA y conocimiento en evolución.',
  cofounder: { name: 'David Amorín', role: 'Cofundador del canal' },
  /** Datos del canal comprobados a mano en youtube.com/@InDevAlways (fecha en `asOf`). */
  youtube: {
    channelId: 'UCxR0X8bZSxANC4gYI1xhVCg',
    subscribers: '4,98 K',
    videos: 255,
    asOf: '2026-10-05',
  },
  socials: {
    youtube: 'https://www.youtube.com/@InDevAlways',
    github: 'https://github.com/alwaysindev',
    instagram: 'https://www.instagram.com/alwaysindev/',
    tiktok: 'https://www.tiktok.com/@always_indev',
    linkedin: 'https://www.linkedin.com/company/106130404/',
  },
} as const;

export const NAV = [
  { href: '/contenido/', label: 'contenido' },
  { href: '/formacion/', label: 'formacion' },
  { href: '/charlas/', label: 'charlas' },
  { href: '/sobre-mi/', label: 'sobre-mi' },
  { href: '/blog/', label: 'blog' },
  { href: '/contacto/', label: 'contacto' },
] as const;
