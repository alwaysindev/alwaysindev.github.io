---
title: 'Web scraping con Scrapy: tu primera araña paso a paso'
description: 'Guía práctica de web scraping con Scrapy en Python: crear el proyecto, escribir una araña, seguir la paginación, exportar datos y hacerlo de forma responsable.'
tldr: 'Scrapy es un framework de Python para extraer datos de webs de forma estructurada. Creas un proyecto, escribes una araña con selectores CSS o XPath, sigues los enlaces de paginación y exportas a JSON o CSV con un solo comando. Respeta robots.txt y limita la velocidad de las peticiones.'
pubDate: 2026-10-05
tags: ['Web scraping', 'Scrapy', 'Python']
draft: true
---

## ¿Cuándo usar Scrapy y no requests + BeautifulSoup?

Para una sola página, `requests` y `BeautifulSoup` bastan. Scrapy compensa cuando necesitas **muchas páginas**: gestiona la cola de peticiones, las hace en paralelo, reintenta los errores, respeta `robots.txt` y exporta los resultados sin código extra.

## Prepara el entorno

```bash
python -m venv .venv
source .venv/bin/activate   # En Windows: .venv\Scripts\activate
pip install scrapy
scrapy startproject citas
cd citas
```

## Escribe la araña

Usaremos [quotes.toscrape.com](https://quotes.toscrape.com/), un sitio pensado para practicar scraping. Crea `citas/spiders/quotes.py`:

```python
import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = ["https://quotes.toscrape.com/"]

    def parse(self, response):
        for quote in response.css("div.quote"):
            yield {
                "texto": quote.css("span.text::text").get(),
                "autor": quote.css("small.author::text").get(),
                "etiquetas": quote.css("div.tags a.tag::text").getall(),
            }

        siguiente = response.css("li.next a::attr(href)").get()
        if siguiente:
            yield response.follow(siguiente, callback=self.parse)
```

`parse` recibe cada respuesta, devuelve un diccionario por cita y, si hay botón "Next", encola la página siguiente con `response.follow`.

## Ejecuta y exporta

```bash
scrapy crawl quotes -O citas.json
```

`-O` sobrescribe el fichero de salida. Cambia la extensión a `.csv` o `.jsonl` y Scrapy elige el formato.

## Prueba los selectores antes de escribir código

La consola interactiva ahorra mucho ensayo y error:

```bash
scrapy shell "https://quotes.toscrape.com/"
>>> response.css("div.quote span.text::text").get()
```

## Haz scraping de forma responsable

En `settings.py`:

```python
ROBOTSTXT_OBEY = True          # Respeta robots.txt (activado por defecto en proyectos nuevos)
AUTOTHROTTLE_ENABLED = True    # Ajusta la velocidad según la respuesta del servidor
DOWNLOAD_DELAY = 1             # Al menos 1 s entre peticiones al mismo dominio
USER_AGENT = "mi-proyecto (+https://tu-web.example)"
```

Además, revisa los términos de uso del sitio, no extraigas datos personales sin base legal y, si existe una API oficial, úsala.

## ¿Dónde seguir?

El material completo del taller está en [taller-scrapy](https://github.com/alwaysindev/taller-scrapy) y el del curso en [curso-webscraping](https://github.com/alwaysindev/curso-webscraping). Si quieres este taller para tu equipo o tu evento, mira [Formación](/formacion/) y [Charlas](/charlas/).
