# Studio Vela — Site statique (Stage 11 Frontend Build)

Site vitrine du studio : 14 pages HTML statiques, CSS vanilla mobile-first,
JS vanilla (~6 KB), aucune dépendance, aucun framework, aucun build step.

## Structure

```
/                       Accueil (la colonne de conversion J1→J8)
/realisations           Index des six concepts
/realisations/{barbier,salon,plombier,restaurant,boutique,garage}
/offres                 Tarifs canoniques + processus + FAQ (8 questions)
/a-propos               Fondateur + philosophie + hallmark
/contact                WhatsApp en premier + formulaire de repli (4 champs)
/mentions-legales       ⚠ launch-blocked — voir « À compléter »
/confidentialite        Politique RGPD (relecture juridique recommandée)
/cgv                    ⚠ placeholder — voir « À compléter »
css/                    tokens → base → layout → components → motion → pages/
js/motion.js            « L'Entrée » : reveals, drawer, FAQ, toggle FR/EN, formulaire
assets/                 images (WebP+JPEG) + polices auto-hébergées (woff2)
sitemap.xml · robots.txt · vercel.json (cleanUrls)
```

## Déploiement (Vercel)

1. `vercel deploy` depuis ce dossier (ou import du dossier dans le dashboard).
   `vercel.json` active `cleanUrls` — les URL servies n'ont pas de `.html`
   ni de slash final.
2. Connecter le domaine `studiovela.fr` + `www` ; vérifier le SSL.
3. Soumettre `https://www.studiovela.fr/sitemap.xml` dans Search Console.
4. Tester les liens WhatsApp / tel / SMS depuis un vrai téléphone.

## À compléter avant la mise en ligne publique (launch-blocking)

| Flag | Où | Quoi |
|---|---|---|
| `[CONFIRM M1]` | `/mentions-legales` | Adresse complète de l'éditeur (commune + code postal exacts) |
| `[CONFIRM TVA]` | `/mentions-legales` | Si franchise en base confirmée par écrit : « TVA non applicable, article 293 B du CGI. » |
| `[CONFIRM M3]` | `/cgv` | Médiateur de la consommation (obligatoire avant contractualisation B2C) |
| `[CONFIRM M4]` | `/cgv`, processus | Conditions exactes acompte 50 % / solde |
| `[CONFIRM M5]` | `/cgv`, FAQ | Politique de révisions (nombre de retours) |
| `[CONFIRM M6]` | Réalisations | URLs des démos en ligne (les cartes pointent vers les pages concept internes) |
| Form handler | `/contact` | Le formulaire utilise `mailto:` (aucun backend). Pour un vrai envoi serveur, brancher un handler (ex. Formspree/Vercel function) et activer le message de succès du Content Plan. |
| A16 wordmark | Navigation | « Studio Vela » est un placeholder typographique (Fraunces) — logotype dessiné à finaliser (M7). |

Tous ces points sont aussi marqués par des commentaires HTML `[CONFIRM …]`
dans les fichiers concernés.

## Éditer le contenu

- Tout le texte vit dans les fichiers HTML, en double couche FR/EN :
  `<span lang="fr">…</span><span lang="en">…</span>` à l'intérieur d'un
  conteneur `.bi` ou `.bi-inline`. Modifier les deux couches.
- Couleurs / espacements / typo : uniquement via `css/tokens.css`.
- Ne pas ajouter de framework, de webfont CDN ni d'analytics sans mettre à
  jour `/confidentialite` (le texte RGPD affirme « aucun cookie de suivi »).

## Langue

FR est la langue servie et canonique (`<html lang="fr" data-lang="fr">`).
Le toggle FR/EN fonctionne sans rechargement, persiste via `sessionStorage`
(`sv-lang`) et permute aussi les liens WhatsApp pré-remplis. Sans JavaScript,
le site s'affiche intégralement en français.
