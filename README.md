# Studio Vela — « La Vitrine Nocturne »

Refonte du site studiovela.fr. Statique pur : HTML sémantique, CSS mobile-first, JS vanilla. Aucun framework, aucun backend, aucun cookie, aucun analytics.

## Concept
Entrer dans une boutique de luxe parisienne, de nuit. Fond noir chaud, flaques de lumière laiton, niches d'exposition en arche (clin d'œil à l'architecture retail type Kith Paris), typographie didone éditoriale (Bodoni Moda) + grotesque précise (Archivo) + étiquettes mono (IBM Plex Mono). Moment signature : la séquence « les lumières s'allument » au chargement. Parallaxe subtile (transform uniquement, desktop, désactivée en reduced-motion).

## Fichiers
```
index.html              Page principale (one-page, FR/EN)
mentions-legales.html   BROUILLON — ne pas publier en l'état
confidentialite.html    Brouillon politique de confidentialité
cgv.html                Placeholder non contractuel
css/styles.css          Système de design complet (tokens en :root)
js/main.js              Toggle FR/EN, nav, reveals, parallaxe, accordéon, CTA sticky
assets/favicon.svg      Favicon (motif arche)
robots.txt, sitemap.xml
```

## Déploiement (Vercel)
1. `vercel` dans ce dossier (ou push vers le repo connecté). Aucun build : output = racine.
2. Domaine studiovela.fr déjà connecté → vérifier le SSL automatique.
3. Tester sur mobile réel : barre CTA sticky, toggle FR/EN, accordéon FAQ.

## À COMPLÉTER AVANT MISE EN LIGNE COMMERCIALE (issu du brief)
- **M1 — Adresse** : confirmer commune + code postal (Soisy-sur-Seine 91450 ou Soisy-sous-Montmorency 95230) puis compléter `mentions-legales.html` et retirer le bandeau « brouillon » + le `noindex`.
- **M2 — TVA** : confirmer la franchise en base par écrit ; ajuster la mention.
- **M3/M4/M5 — CGV** : médiateur de la consommation à désigner + politique d'acompte et de retouches à définir avant de publier des CGV contractuelles.
- **M6 — Démos** : la section « La Vitrine » affiche 4 niches *non cliquables* (les URLs des 6 démos n'étaient pas confirmées). Relier chaque niche à sa démo réelle : entourer `.niche-arch` d'un `<a href="...">` ou ajouter un lien sous le nom. **Vérifier qu'aucun lien démo/légal existant ne casse** (contrainte A4 du brief).
- **OG image** : ajouter une image `og:image` 1200×630 (ex. capture du hero) dans `<head>`.
- Recommandé : email pro `contact@studiovela.fr` (Cloudflare Email Routing, gratuit) au lieu de Gmail.

## Modifier les textes
Chaque texte existe en deux versions côte à côte dans le HTML :
`<span class="fr">…</span><span class="en">…</span>`. Modifier les deux. Une seule langue est visible à la fois (contrainte du brief), persistée par sessionStorage.

## Rapport de vérification (exécuté dans l'environnement de build)
- **Tier 1 — statique : PROPRE.** `node --check` sur main.js ; parsing HTML des 4 pages (balises, IDs dupliqués, H1 unique, ancres internes) ; intégrité de tous les liens/assets locaux ; CSS parsé sans erreur (tinycss2) ; ratios de contraste calculés — toutes les paires texte/fond ≥ 4.5:1 (AA).
- **Tier 2 — runtime (jsdom) : ZÉRO ERREUR.** Chargement de main.js, toggle FR→EN→FR (a détecté puis validé la correction d'une race condition), burger ouvert/fermé, 8 accordéons FAQ exercés, scroll, touche Échap, reveals.
- **Non vérifiable ici** : navigateur headless complet (téléchargement Chrome bloqué sur ce réseau) → pas de test visuel d'overflow ni d'axe-core automatisé. À faire au premier déploiement : ouvrir sur mobile 375px et vérifier l'absence de scroll horizontal (sécurité `overflow-x:hidden` posée sur body).
- Le site est complet et utilisable **sans JavaScript** (FR affiché par défaut, FAQ ouverte, CTA sticky visible) et **sans animation** (`prefers-reduced-motion` retire entrée, reveals et parallaxe).
