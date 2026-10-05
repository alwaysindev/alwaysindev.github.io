/**
 * Constructor del grafo JSON-LD.
 * Regla: el schema solo describe lo que también es visible en la página.
 * Los @id son estables para que buscadores y LLMs unan la entidad entre páginas.
 */
import { SITE, PERSON, BRAND, EMPLOYER, PROFILES, employerStatus } from '../config/site';
import { CERTIFICATIONS, isActive, type Talk, type Faq } from '../data/profile';

type Node = Record<string, unknown>;

export const IDS = {
  website: `${SITE.url}/#website`,
  brand: BRAND.id,
  person: PERSON.id,
  logo: `${SITE.url}/#logo`,
};

export function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

export function brandNode(): Node {
  return {
    '@type': 'Organization',
    '@id': IDS.brand,
    name: BRAND.name,
    url: abs('/'),
    description: BRAND.description,
    slogan: BRAND.tagline,
    inLanguage: 'es',
    logo: {
      '@type': 'ImageObject',
      '@id': IDS.logo,
      url: abs('/apple-touch-icon.png'),
      width: 180,
      height: 180,
    },
    founder: [
      { '@id': IDS.person },
      { '@type': 'Person', name: BRAND.cofounder.name },
    ],
    sameAs: Object.values(BRAND.socials),
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: abs('/'),
    name: BRAND.name,
    description: BRAND.description,
    inLanguage: 'es',
    publisher: { '@id': IDS.brand },
  };
}

export function personNode(): Node {
  const status = employerStatus();
  const worksFor =
    status === 'current'
      ? { '@type': 'Organization', name: EMPLOYER.company, url: EMPLOYER.companyUrl }
      : { '@type': 'Organization', name: EMPLOYER.previous.company };
  const jobTitle = status === 'current' ? EMPLOYER.title : EMPLOYER.previous.title;

  return {
    '@type': 'Person',
    '@id': IDS.person,
    name: PERSON.name,
    alternateName: PERSON.shortName,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    url: abs('/sobre-mi/'),
    description: PERSON.tagline,
    jobTitle,
    worksFor,
    affiliation: [
      { '@type': 'EducationalOrganization', name: 'The Bridge', url: 'https://thebridge.tech/' },
    ],
    address: { '@type': 'PostalAddress', addressLocality: PERSON.city, addressCountry: PERSON.country },
    knowsAbout: [...PERSON.knowsAbout],
    hasCredential: CERTIFICATIONS.filter((c) => isActive(c)).map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: c.issuer, url: c.issuerUrl },
      dateCreated: c.issued,
      ...(c.credentialUrl ? { url: c.credentialUrl } : {}),
    })),
    ...(PERSON.headshot ? { image: abs(PERSON.headshot) } : {}),
    sameAs: Object.values(PROFILES),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(pageUrl: string, crumbs: Crumb[]): Node {
  const all = [{ name: 'Inicio', path: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export type PageType = 'WebPage' | 'ProfilePage' | 'ContactPage' | 'CollectionPage' | 'AboutPage';

export function webPageNode(opts: {
  url: string;
  type: PageType;
  title: string;
  description: string;
  hasBreadcrumb: boolean;
  mainEntity?: string;
  dateModified?: string;
  lang?: string;
}): Node {
  return {
    '@type': opts.type,
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.lang ?? 'es',
    isPartOf: { '@id': IDS.website },
    about: { '@id': opts.mainEntity ?? IDS.brand },
    ...(opts.mainEntity ? { mainEntity: { '@id': opts.mainEntity } } : {}),
    ...(opts.hasBreadcrumb ? { breadcrumb: { '@id': `${opts.url}#breadcrumb` } } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function blogPostingNode(opts: {
  url: string;
  title: string;
  description: string;
  published: Date;
  modified?: Date;
  tags: string[];
}): Node {
  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
    headline: opts.title,
    description: opts.description,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.modified ?? opts.published).toISOString(),
    inLanguage: 'es',
    author: { '@id': IDS.person },
    publisher: { '@id': IDS.brand },
    image: abs(SITE.defaultOgImage),
    keywords: opts.tags.join(', '),
    isPartOf: { '@id': IDS.website },
  };
}

/** Solo charlas verificadas (con fecha y fuente pública) se publican como Event. */
export function eventNodes(talks: Talk[]): Node[] {
  return talks
    .filter((t) => t.verified && t.date)
    .map((t) => ({
      '@type': 'Event',
      name: t.title ? `${t.title} — ${t.event}` : t.event,
      startDate: t.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: t.venue ?? t.city,
        address: { '@type': 'PostalAddress', addressLocality: t.city, addressCountry: 'ES' },
      },
      ...(t.summary ? { description: t.summary } : {}),
      ...(t.eventUrl ? { url: t.eventUrl } : {}),
      performer: { '@id': IDS.person },
      inLanguage: 'es',
    }));
}

export function faqNode(url: string, faqs: Faq[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function graph(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
