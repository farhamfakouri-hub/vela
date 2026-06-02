# Studio Vela — Site portfolio

Site vitrine / portfolio statique pour Studio Vela (création de sites web pour artisans et commerces locaux à Paris). HTML, CSS et JavaScript pur — aucun framework, aucune dépendance externe sauf les polices Google Fonts.

## Structure

```
studio-vela/
  index.html                    → page principale (portfolio + ventes)
  styles.css                    → design system du site principal
  script.js                     → menu mobile, scroll reveal, FAQ
  demo-styles.css               → styles partagés des 6 démos
  mentions-legales.html         → mentions légales
  politique-confidentialite.html→ politique RGPD
  cgv.html                      → conditions générales de vente (à finaliser)
  README.md
  demos/
    demo.js                     → reveal partagé des démos
    barbershop.html             → Maison Figaro (barbier)
    salon-beaute.html           → Studio Lina (coiffure / beauté)
    plombier.html               → Berger Plomberie (plombier)
    restaurant.html             → Trattoria Nonna (restaurant)
    boutique.html               → Maison Laurent (boutique)
    garage.html                 → Garage Moreau (garage auto)
  assets/
    images/ · icons/
```

## Système de démos cliquables

Chaque carte du portfolio de `index.html` ouvre un **vrai site de démonstration** complet dans `demos/`. Chaque démo a sa propre stratégie, ses couleurs, sa typographie, son CTA et sa logique de conversion — pour montrer que Studio Vela adapte le design à chaque métier.

Les 6 démos partagent `demo-styles.css` (structure commune) mais définissent chacune leur palette et leurs polices via `body[data-demo="..."]`. Les liens sont **relatifs** :
- carte → démo : `demos/barbershop.html`
- démo → accueil : `../index.html`
- démo → styles : `../demo-styles.css`, script : `demo.js`

Tous les chemins relatifs fonctionnent en local et sur Vercel sans configuration.

**Important :** les démos sont des **concepts** clairement étiquetés ("Concept démo", bandeau en haut, note en pied de page). Aucun client réel, aucun avis réel, aucune adresse/donnée légale réelle. Numéros de téléphone et adresses des démos sont fictifs.

## Lancer en local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Déploiement sur Vercel

Le site est 100 % statique, aucun build.

1. Installez la CLI : `npm i -g vercel` (ou utilisez l'import Git sur vercel.com).
2. Depuis le dossier `studio-vela` : `vercel`.
3. Framework preset : **Other**. Build command : aucune. Output : la racine.
4. Le déploiement fournit une URL HTTPS. Ajoutez un domaine via Project → Settings → Domains.

Déploie aussi sans problème sur Netlify (drag-drop), GitHub Pages ou tout hébergement statique (OVH, Hostinger).

## Pas de suivi

Aucun script de tracking, aucun analytics, aucun cookie de suivi, aucune newsletter. Contact uniquement par liens directs WhatsApp / SMS / téléphone / email.

## Pages légales

`mentions-legales.html`, `politique-confidentialite.html` et `cgv.html` sont inclus. Détails confirmés intégrés (éditeur, SIRET, adresse, email). La CGV et certains points restent à finaliser (voir ci-dessous).

## Placeholders à compléter avant publication

| Placeholder | Où | Remplacer par |
|---|---|---|
| `[Hébergeur à confirmer]` | mentions-legales, confidentialité | hébergeur final (Vercel, Netlify, OVH…) |
| `[CGV à finaliser]` | cgv.html | conditions générales complètes |
| `[Médiateur de la consommation]` | mentions-legales, cgv | médiateur désigné avant contrat consommateur |
| `https://studiovela.fr/` | canonical / OG / schema | domaine réel |
| `assets/images/og-cover.jpg` | OG image | image 1200×630 px |

## Améliorations futures

- Remplacer une démo concept par une vraie réalisation client dès la première livraison.
- Ajouter de vraies captures dans les vignettes galerie (actuellement emplacements CSS).
- Formulaire de devis optionnel via Formspree ou Netlify Forms (sans backend).
- Préciser la commune exacte (Soisy-sous-Montmorency 95 / Soisy-sur-Seine 91) dans les pages légales.

## Enrichissement des démos (v3)

Chaque démo est désormais une mini-maquette riche et différenciée, avec sa propre identité fictive complète (nom, adresse démo, téléphone, email, horaires), des services détaillés avec tarifs indicatifs et durées, un formulaire spécifique au métier (**frontend uniquement — aucune donnée envoyée**), du contenu SEO local, une FAQ, des emplacements média stylés (pas de boîtes grises vides) et une direction artistique distincte (palette, typographie, rythme de mise en page, langage de motion). Toutes les informations sont fictives et clairement étiquetées comme démonstration.

La page d'accueil propose désormais des cartes portfolio avec angle stratégique, une section « Ce que vous recevez » et une section « Inclus / non inclus » pour clarifier l'offre.

## Placeholders à remplacer AVANT publication

La plupart des informations sont désormais confirmées. Restent à compléter&nbsp;:

| Placeholder | Où | Remplacer par |
|---|---|---|
| `[Hébergeur à confirmer]` | mentions-legales.html §2 | nom, raison sociale, adresse et téléphone de l'hébergeur final (ex. Netlify, Vercel, OVH) |
| `[CGV à finaliser]` | mentions-legales.html §5 | conditions générales de vente complètes |
| `[Médiateur de la consommation]` | mentions-legales.html §6 | médiateur désigné, avant tout contrat avec des consommateurs |
| `https://studiovela.fr/` | canonical / OG / schema | le vrai domaine une fois acheté |
| `assets/images/og-cover.jpg` | balise OG image | une vraie image 1200×630 px |

Informations confirmées et déjà intégrées&nbsp;: éditeur (Farham Fakouri), SIRET 988 637 971 00017, adresse professionnelle (6 rue Marie Curie, Soisy), email (studiovelaparis@gmail.com), téléphone/WhatsApp/SMS, tarifs, délai de livraison estimé (7 jours), maquette et devis gratuits, facture fournie.

## Formulaire / contact

Le site n'utilise **pas** de formulaire à backend : le contact passe par des liens directs WhatsApp (`wa.me`), SMS (`sms:`) et téléphone (`tel:`) — ils fonctionnent immédiatement sans serveur.

Si vous ajoutez plus tard un formulaire de devis, branchez-le sur un service sans backend comme **Formspree** ou **Netlify Forms** (aucune clé API exposée dans le code).

## Réalisations

Les 6 cartes du portfolio sont des **concepts de démonstration**, clairement étiquetés "Concept". Remplacez-les par de vraies captures (`assets/images/`) au fur et à mesure que vous livrez des clients réels. Ne présentez jamais un concept comme un client réel.

## Notes techniques

- Mobile-first, testé jusqu'à 320 px de large, aucun débordement horizontal.
- Accessibilité : navigation clavier, focus visibles, `aria-expanded` sur le menu, lien d'évitement, `prefers-reduced-motion` respecté.
- SEO : un seul `<h1>`, hiérarchie de titres logique, meta title/description, Open Graph, JSON-LD `ProfessionalService`.
- Polices : Bricolage Grotesque (titres) + Albert Sans (corps) via Google Fonts.
