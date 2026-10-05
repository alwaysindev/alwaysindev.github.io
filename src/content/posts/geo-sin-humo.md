---
title: 'GEO sin humo: qué funciona para aparecer en buscadores con IA'
description: 'Qué es GEO, qué dicen Google, OpenAI y Anthropic sobre cómo rastrean y citan, y qué medidas tienen evidencia frente a las que son moda.'
tldr: 'GEO (Generative Engine Optimization) es conseguir que ChatGPT, Perplexity, Claude o los AI Overviews de Google te entiendan y te citen. Según la documentación oficial, la base es SEO técnico sólido, contenido original y dejar entrar a los rastreadores de búsqueda con IA. Archivos como llms.txt no son necesarios para Google.'
pubDate: 2026-10-05
tags: ['GEO', 'SEO', 'IA generativa']
draft: true
---

## ¿Qué es GEO?

**GEO (Generative Engine Optimization)** es el conjunto de prácticas para que los motores que responden con IA (ChatGPT con búsqueda, Perplexity, Claude, Gemini o los AI Overviews y el AI Mode de Google) encuentren tu contenido, lo entiendan bien y lo citen como fuente.

No es una disciplina separada del SEO. Es SEO aplicado a un nuevo tipo de resultado: en lugar de una lista de enlaces, una respuesta redactada que menciona algunas fuentes.

## ¿Qué dice Google?

Google publicó en 2026 una guía específica sobre cómo optimizar para sus funciones de IA generativa. Sus mensajes principales:

- **No hay requisitos extra** para aparecer en AI Overviews o AI Mode. Para ser elegible, la página tiene que estar indexada y poder mostrarse con fragmento en la búsqueda normal.
- **No hacen falta archivos especiales para IA**, markup adicional ni versiones en Markdown de las páginas.
- Lo que marca la diferencia es el **contenido original y útil**, no el que recicla lo que ya existe o lo que un modelo podría generar solo.
- Search Console incluye un informe de rendimiento en funciones de IA generativa para medirlo.

Fuente: [Google Search Central, guía de optimización para IA generativa](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## ¿Qué dicen OpenAI y Anthropic sobre sus rastreadores?

Ambas empresas separan los rastreadores de **búsqueda** de los de **entrenamiento**, y eso cambia cómo hay que configurar `robots.txt`:

| Empresa | Búsqueda | Peticiones del usuario | Entrenamiento |
|---|---|---|---|
| OpenAI | `OAI-SearchBot` | `ChatGPT-User` | `GPTBot` |
| Anthropic | `Claude-SearchBot` | `Claude-User` | `ClaudeBot` |

OpenAI indica que los sitios que bloquean `OAI-SearchBot` no aparecen en las respuestas de búsqueda de ChatGPT. Anthropic advierte de que bloquear `Claude-SearchBot` reduce la visibilidad en su búsqueda. Bloquear solo los rastreadores de entrenamiento no te saca de la búsqueda.

Fuentes: [OpenAI, rastreadores](https://developers.openai.com/api/docs/bots) y [Anthropic, rastreadores](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

## ¿Qué medidas tienen evidencia?

1. **Ser rastreable e indexable.** Si no estás en el índice, no puedes ser fuente. Sitemap, enlaces internos, Search Console y Bing Webmaster Tools.
2. **Que el contenido esté en el HTML.** Muchos rastreadores no ejecutan JavaScript. Si tu bio se pinta en el navegador, para ellos no existe.
3. **Abrir el acceso a los rastreadores de búsqueda con IA** en `robots.txt`.
4. **Contenido original y verificable.** Datos propios, experiencia real, fuentes enlazadas y fechas visibles.
5. **Consistencia de entidad.** El mismo nombre, la misma descripción y enlaces cruzados entre tu web, LinkedIn, GitHub y el resto de perfiles. Así el modelo no confunde a quién se refiere.

## ¿Y llms.txt?

`llms.txt` es una propuesta para ofrecer a los modelos un resumen del sitio en Markdown. Google ha dicho explícitamente que no lo usa. Puede tener sentido para agentes de código que lo leen, y cuesta poco mantenerlo, pero **no es una palanca de visibilidad demostrada**. En este sitio está, marcado como experimental.

## ¿Cómo se mide?

No existe todavía un "ranking" de GEO equivalente a la posición en Google. Lo práctico:

- Revisar el informe de IA generativa de Search Console.
- Hacer las mismas preguntas cada mes a varios motores (por ejemplo, "¿Qué es alwaysInDEV?") y anotar si la respuesta es correcta y si te citan.
- Vigilar el tráfico de referencia desde chatgpt.com, perplexity.ai y similares.

En [Sobre este sitio](/sobre-este-sitio/) documento cómo aplico todo esto aquí mismo, incluido lo que no hago a propósito.
