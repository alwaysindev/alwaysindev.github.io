import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';
import type { APIContext } from 'astro';
import { BRAND } from '../config/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${BRAND.name} — blog`,
    description: BRAND.description,
    site: context.site!,
    trailingSlash: true,
    customData: '<language>es-es</language>',
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
