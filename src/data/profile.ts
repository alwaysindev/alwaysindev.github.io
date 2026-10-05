/**
 * Datos de trayectoria. Fuente: perfil de LinkedIn (revisado 2026-10-05) y
 * páginas públicas enlazadas en `source`. No añadir nada sin fuente.
 */

export interface Experience {
  role: string;
  org: string;
  orgUrl?: string;
  start: string; // AAAA-MM
  end?: string; // AAAA-MM; ausente = actualidad
  summary?: string;
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Profesor de Data Analytics y Data Science',
    org: 'The Bridge | Digital Talent Accelerator',
    orgUrl: 'https://thebridge.tech/',
    start: '2026-03',
    summary:
      'Clases en formato Live Review en el bootcamp online de Data Science e IA y formación en Claude. Coordinador académico B2B de un programa de Data Analytics aplicada al deporte para ASE Athletics.',
  },
  {
    role: 'Data Scientist',
    org: 'IO Investigación',
    start: '2026-01',
  },
  {
    role: 'Profesor de Web Scraping',
    org: 'MBIT School',
    orgUrl: 'https://mbitschool.com/',
    start: '2025-11',
    summary:
      'Sesiones de web scraping en el Máster en Data Engineering, Cloud y Big Data y en el Máster en Data Science e Inteligencia Artificial.',
  },
  {
    role: 'Data Scientist',
    org: 'TMC Spain',
    start: '2024-11',
    end: '2026-01',
    summary: 'Proyectos de IA generativa para una gran empresa de telecomunicaciones.',
  },
  {
    role: 'Profesor de Data Science e IA',
    org: 'Evolve',
    start: '2025-04',
    end: '2025-05',
  },
  {
    role: 'Data Scientist / AI Engineer',
    org: 'Capgemini',
    start: '2023-10',
    end: '2024-11',
  },
  {
    role: 'Data Science Teacher Assistant',
    org: 'The Bridge | Digital Talent Accelerator',
    orgUrl: 'https://thebridge.tech/',
    start: '2023-01',
    end: '2023-10',
  },
];

export interface Certification {
  name: string;
  issuer: string;
  issuerUrl: string;
  issued: string; // AAAA-MM-DD o AAAA-MM
  expires?: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Claude Certified Architect – Foundations (CCA-F)',
    issuer: 'Anthropic',
    issuerUrl: 'https://www.anthropic.com/',
    issued: '2026-09-28',
  },
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    issuerUrl: 'https://learn.microsoft.com/',
    issued: '2024-06',
  },
  {
    name: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    issuerUrl: 'https://learn.microsoft.com/',
    issued: '2024-08',
    expires: '2025-08',
  },
];

export function isActive(c: Certification, now = new Date()): boolean {
  return !c.expires || new Date(c.expires) > now;
}

/**
 * Charlas.
 * - `verified: true` solo si hay una fuente pública con fecha (va al JSON-LD como Event).
 * - Las demás se muestran como "escenarios" sin fecha ni título inventados.
 */
export interface Talk {
  title?: string;
  event: string;
  eventUrl?: string;
  date?: string; // AAAA-MM-DD
  city?: string;
  venue?: string;
  summary?: string;
  source?: string;
  verified: boolean;
}

export const TALKS: Talk[] = [
  {
    title: 'Web scraping de portales inmobiliarios, con demo en directo de Scrapy',
    event: 'PyData Madrid — Navegación, mapas, y más',
    eventUrl: 'https://guild.host/events/navegacin-mapas-y-ms-z4wf80',
    date: '2025-11-13',
    city: 'Madrid',
    venue: 'TomTom, Edificio Aqua',
    summary:
      'Cómo usar el scraping para extraer datos de portales inmobiliarios, con una demo en directo de Scrapy.',
    source: 'https://guild.host/events/navegacin-mapas-y-ms-z4wf80',
    verified: true,
  },
  // TODO(Alejandro): añadir título, fecha y enlace para pasar a `verified: true`.
  { event: 'Nerdearla España', city: 'Madrid', verified: false },
  { event: 'Commit Conf', city: 'Madrid', verified: false },
  { event: 'DataDax Summit', verified: false },
];

/** Charlas que ofrece a organizadores (catálogo). */
export interface TalkOffer {
  title: string;
  abstract: string;
  level: 'Introductorio' | 'Intermedio' | 'Avanzado';
  duration: string;
  formats: string[];
}

export const TALK_CATALOG: TalkOffer[] = [
  {
    title: 'Scrapy: el arte del web scraping',
    abstract:
      'Fundamentos del web scraping, casos de uso reales, por qué Scrapy frente a alternativas más simples y una demo en directo de un spider de principio a fin. Incluye buenas prácticas para no saturar los sitios y las novedades recientes del ecosistema Python.',
    level: 'Introductorio',
    duration: '30–45 min',
    formats: ['Charla', 'Taller práctico'],
  },
  {
    title: 'GEO sin humo: cómo deciden los buscadores con IA a quién citar',
    abstract:
      'Qué es Generative Engine Optimization, qué dicen realmente Google, OpenAI y Anthropic sobre cómo rastrean y citan, y qué medidas tienen evidencia frente a las que son moda. Con un caso real: el propio sitio del ponente.',
    level: 'Intermedio',
    duration: '30–45 min',
    formats: ['Charla'],
  },
  {
    title: 'De analista a agente: Claude Code en el día a día de un equipo de datos',
    abstract:
      'Flujos de trabajo reales con Claude Code para análisis, limpieza de datos y prototipado: cuándo acelera, cuándo no y cómo revisar lo que produce. Basado en la experiencia formando equipos con Claude.',
    level: 'Intermedio',
    duration: '30–45 min',
    formats: ['Charla', 'Taller práctico'],
  },
];

export interface Teaching {
  org: string;
  orgUrl?: string;
  program: string;
  role: string;
  since: string;
}

export const TEACHING: Teaching[] = [
  {
    org: 'The Bridge',
    orgUrl: 'https://thebridge.tech/',
    program: 'Bootcamp online de Data Science e IA · formación en Claude',
    role: 'Profesor (Live Review) y formador de Claude',
    since: '2026',
  },
  {
    org: 'ASE Athletics (vía The Bridge)',
    orgUrl: 'https://aseathletics.com/',
    program: 'Programa de Data Analytics aplicada al deporte',
    role: 'Coordinador académico',
    since: '2026',
  },
  {
    org: 'MBIT School',
    orgUrl: 'https://mbitschool.com/',
    program: 'Máster en Data Engineering, Cloud y Big Data · Máster en Data Science e IA',
    role: 'Profesor de Web Scraping',
    since: '2025',
  },
  {
    org: 'Evolve',
    program: 'Formación en Data Science e IA',
    role: 'Profesor',
    since: '2025',
  },
];

export interface Project {
  name: string;
  url: string;
  description: string;
  language: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'taller-scrapy',
    url: 'https://github.com/alwaysindev/taller-scrapy',
    description: 'Taller para construir una araña web con Scrapy: desde la configuración del entorno hasta la ejecución y las pruebas.',
    language: 'Jupyter Notebook',
  },
  {
    name: 'curso-webscraping',
    url: 'https://github.com/alwaysindev/curso-webscraping',
    description: 'Material del curso de web scraping con Python.',
    language: 'Jupyter Notebook',
  },
  {
    name: 'curso-python-yt',
    url: 'https://github.com/alwaysindev/curso-python-yt',
    description: 'Curso de Python desde cero, organizado por niveles de dificultad, para quien empieza a programar.',
    language: 'Jupyter Notebook',
  },
  {
    name: 'curso-prefect',
    url: 'https://github.com/alwaysindev/curso-prefect',
    description: 'Prácticas de orquestación con Prefect: un pipeline sobre la API de Open-Meteo que evoluciona de script plano a flow con reintentos.',
    language: 'Python',
  },
  {
    name: 'prompt-engineering-2026',
    url: 'https://github.com/alwaysindev/prompt-engineering-2026',
    description: 'Notebooks y datos del vídeo de prompt engineering del canal.',
    language: 'Jupyter Notebook',
  },
  {
    name: 'ai-news-generator',
    url: 'https://github.com/alwaysindev/ai-news-generator',
    description: 'Agregador de noticias de IA y Data Science que genera borradores de reels y posts de LinkedIn.',
    language: 'TypeScript',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const ABOUT_FAQ: Faq[] = [
  {
    q: '¿Quién es Alejandro Cárabe?',
    a: 'Alejandro Cárabe Arranz es un AI Engineer y Data Scientist de Madrid. Trabaja en IA generativa aplicada a negocio, forma en Data Science, web scraping y Claude en The Bridge y MBIT School, y divulga en español en el canal alwaysInDEV.',
  },
  {
    q: '¿En qué está especializado?',
    a: 'IA generativa y LLMs, Generative Engine Optimization (GEO), Data Science con Python y SQL, y extracción de datos con web scraping (Scrapy). Está certificado como Claude Certified Architect – Foundations por Anthropic.',
  },
  {
    q: '¿Dónde da clase?',
    a: 'En The Bridge (bootcamp de Data Science e IA y formación en Claude), en MBIT School (web scraping en dos másteres) y como coordinador académico de un programa de Data Analytics aplicada al deporte para ASE Athletics.',
  },
  {
    q: '¿Da charlas o formación para empresas?',
    a: 'Sí. Da charlas sobre web scraping, GEO y Claude Code, y diseña formación a medida en Python, SQL, scraping e IA generativa. Puedes proponerle una charla o una formación desde la página de contacto.',
  },
  {
    q: '¿Qué es alwaysInDEV?',
    a: 'Es el proyecto de divulgación técnica en español que Alejandro cofundó con David Amorín y que hoy lidera: vídeos en YouTube, píldoras cortas y repositorios abiertos en GitHub sobre IA, Data Science y programación.',
  },
];
