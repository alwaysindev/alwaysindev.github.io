import { getCollection } from 'astro:content';

/** Posts visibles: en `astro dev` se muestran también los borradores para poder revisarlos. */
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
