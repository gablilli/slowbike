#!/usr/bin/env python3
"""
Convert remaining route pages from Wix iframes to standalone
"""

routes = {
    'bevelle': {
        'title': 'Tour Bevelle',
        'desc': 'Un percorso attraverso le colline di Bevelle, tra natura e panorami mozzafiato.',
        'image': 'https://static.wixstatic.com/media/6e451a_94afe0ffa0924ff8936a093c34e3d5b9~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80,enc_avif,quality_auto/bike-store-edited%20(1).jpg',
        'distance': '35 km',
        'elevation': '480 m',
        'difficulty': 'Media',
        'duration': '2-3 ore'
    },
    'bevello': {
        'title': 'Tour Bevello',
        'desc': 'Escursione attraverso le colline di Bevello, con viste panoramiche sulla vallata.',
        'image': 'https://static.wixstatic.com/media/6e451a_94afe0ffa0924ff8936a093c34e3d5b9~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80,enc_avif,quality_auto/bike-store-edited%20(1).jpg',
        'distance': '32 km',
        'elevation': '420 m',
        'difficulty': 'Facile',
        'duration': '2-3 ore'
    },
    'valdichiascio': {
        'title': 'Val di Chiascio',
        'desc': 'Percorso lungo la valle del fiume Chiascio, tra boschi e antichi borghi.',
        'image': 'https://static.wixstatic.com/media/6e451a_3e8b75d98f8649ac9e821c2f9dcce4ff~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80,enc_avif,quality_auto/valdichiascio.jpg',
        'distance': '42 km',
        'elevation': '320 m',
        'difficulty': 'Facile',
        'duration': '3 ore'
    },
    'laghetti-scagliae': {
        'title': 'Laghetti Scagliae',
        'desc': 'Un percorso spettacolare tra i laghetti di montagna della zona Scagliae.',
        'image': 'https://static.wixstatic.com/media/6e451a_6f6b7d96cac44fa59a78e2a211027010~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80,enc_avif,quality_auto/laghetto%20Fassia.jpg',
        'distance': '38 km',
        'elevation': '580 m',
        'difficulty': 'Media',
        'duration': '3-4 ore'
    },
    'mauretta': {
        'title': 'Mauretta',
        'desc': 'Escursione panoramica verso Mauretta, con viste spettacolari sul territorio.',
        'image': 'https://static.wixstatic.com/media/6e451a_92ef8069d0634d97a847441bb19f52ee~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80,enc_avif,quality_auto/Mauretta01.jpg',
        'distance': '28 km',
        'elevation': '450 m',
        'difficulty': 'Media',
        'duration': '2-3 ore'
    },
    'montecucco': {
        'title': 'Monte Cucco',
        'desc': 'Salita impegnativa verso il Monte Cucco, per ciclisti esperti. Panorami mozzafiato sulla sommità.',
        'image': 'https://static.wixstatic.com/media/6e451a_d294b1169ff7444a97592504bd8aa62c~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80,enc_avif,quality_auto/pian%20di%20spilli.jpg',
        'distance': '52 km',
        'elevation': '1200 m',
        'difficulty': 'Difficile',
        'duration': '4-5 ore'
    }
}

template = '''<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <title>{title} | SlowBike Gubbio</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/css/subpages.css" />
</head>
<body>

  <!-- Header -->
  <header class="site-header">
    <div class="container">
      <a href="/" class="logo">
        <img src="https://static.wixstatic.com/media/6e451a_67e1a060deac4653af1e1de45458021e~mv2.png/v1/fill/w_49,h_48,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/cropped-SlowBikeGubbio%20(1)_edited.png" alt="SlowBike Gubbio Logo">
        <span>SlowBikeGubbio</span>
      </a>
      <nav class="main-nav">
        <a href="/">Home</a>
        <a href="/pagine/percorsi.html">Percorsi</a>
        <a href="/pagine/blog.html">Blog</a>
        <a href="/pagine/contattaci.html">Contattaci</a>
      </nav>
    </div>
  </header>

  <!-- Route Detail -->
  <section class="route-detail">
    <div class="container">
      <div class="route-detail-header">
        <h1>{title}</h1>
        <p class="route-description">{desc}</p>
      </div>

      <!-- Route Stats -->
      <div class="route-stats">
        <div class="route-stat">
          <div class="route-stat-label">Distanza</div>
          <div class="route-stat-value">{distance}</div>
        </div>
        <div class="route-stat">
          <div class="route-stat-label">Dislivello</div>
          <div class="route-stat-value">{elevation}</div>
        </div>
        <div class="route-stat">
          <div class="route-stat-label">Difficoltà</div>
          <div class="route-stat-value">{difficulty}</div>
        </div>
        <div class="route-stat">
          <div class="route-stat-label">Durata</div>
          <div class="route-stat-value">{duration}</div>
        </div>
      </div>

      <!-- Gallery -->
      <div class="route-gallery">
        <img src="{image}" alt="{title}">
      </div>

      <!-- Description -->
      <div class="route-description">
        <h2>Descrizione del Percorso</h2>
        <p>{desc}</p>
        <p>Questo percorso offre un'esperienza unica nel territorio di Gubbio, combinando natura, storia e cultura in un itinerario indimenticabile.</p>
      </div>

      <!-- GPX Download -->
      <div class="gpx-section">
        <h3>Scarica la traccia GPX</h3>
        <p>Porta con te il percorso sul tuo dispositivo GPS</p>
        <a href="/gpx/{slug}.gpx" class="btn-download" download>Download GPX</a>
      </div>

    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 SlowBike Gubbio. Tutti i diritti riservati.</p>
      <div class="footer-links">
        <a href="/pagine/contattaci.html">Contattaci</a>
        <a href="/pagine/blog.html">Blog</a>
        <a href="/pagine/percorsi.html">Tutti i Percorsi</a>
      </div>
    </div>
  </footer>

</body>
</html>'''

for slug, data in routes.items():
    filename = f'pagine/{slug}.html'
    html = template.format(
        title=data['title'],
        desc=data['desc'],
        image=data['image'],
        distance=data['distance'],
        elevation=data['elevation'],
        difficulty=data['difficulty'],
        duration=data['duration'],
        slug=slug
    )
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Created {filename}')

print('All route pages converted!')
