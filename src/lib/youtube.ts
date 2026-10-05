/**
 * Últimos vídeos del canal, leídos del feed RSS público de YouTube en tiempo de build.
 * Si el feed falla, devuelve [] y la sección no se muestra (el build nunca se rompe por esto).
 * El workflow reconstruye la web cada semana para que la lista se mantenga al día.
 */
import { BRAND } from '../config/site';

export interface Video {
  id: string;
  title: string;
  published: Date;
  url: string;
  thumb: string;
  isShort: boolean;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let cache: Video[] | null = null;

export async function getVideos(): Promise<Video[]> {
  if (cache) return cache;
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${BRAND.youtube.channelId}`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    cache = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
      const id = e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? '';
      const title = decode(e.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
      return {
        id,
        title,
        published: new Date(e.match(/<published>(.*?)<\/published>/)?.[1] ?? 0),
        url: `https://www.youtube.com/watch?v=${id}`,
        thumb: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
        // En este canal, los Shorts empiezan por un emoji y los vídeos largos no.
        isShort: /^\p{Extended_Pictographic}/u.test(title.trim()),
      };
    });
  } catch (err) {
    console.warn(`[youtube] No se pudo leer el feed: ${(err as Error).message}`);
    cache = [];
  }
  return cache;
}
