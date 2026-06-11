# Studio Vela — Stage 11 Build Log

**Stage:** 11 — Frontend Build · **Date:** 2026-06-11
**Sources of truth (transcribed, not reinterpreted):** UX Architecture Blueprint (5) · Content & SEO Plan (7) · Visual Design System (9) · Motion Design Spec (10) · Asset Production Plan (Asset stage)

---

## 1. [CONFIRM] items carried into the build (visible as HTML comments)

| Flag | File(s) | State in the build |
|---|---|---|
| M1 — adresse éditeur | `mentions-legales/index.html` | « À compléter avant publication » affiché ; aucune adresse inventée. Launch-blocking. |
| TVA — régime | `mentions-legales/index.html` | Aucune mention TVA émise tant que non confirmée par écrit. |
| M3 — médiateur | `cgv/index.html` | CGV = placeholder honnête (« document en cours de finalisation ») ; structure listée, rien d'inventé. Launch-blocking pour la contractualisation. |
| M4 — acompte 50 % | Home + Offres (process step 04), `cgv` | Copy du Content Plan telle quelle ; conditions exactes à confirmer. |
| M5 — révisions | Home mini-FAQ, Offres FAQ #5 | Les réponses renvoient au devis, comme écrit au Stage 7. |
| M6 — URLs démos | Home J3, Réalisations, 6 sous-pages | Les cartes pointent vers les pages concept internes ; liens externes en attente. |
| Form handler | `contact/index.html` | Canal `mailto:` (JS + fallback `action=mailto` sans JS). Pas de faux succès : la ligne « Message reçu… » du Content Plan est réservée à un vrai handler serveur. |
| A16 wordmark | nav de chaque page | Placeholder typographique « Studio Vela » (Fraunces, Or chaud) — logotype M7 à fournir. |
| Portrait fondateur | — | Non simulé (client-must-provide, Asset Plan §5). Aucune image de personne sur le site. |

## 2. Documented deviations (each flagged in-code with rationale)

1. **`--or-chaud-700: #785827` (tokens.css).** Conflit interne du VDS : sa table de contraste interdit l'Or chaud #C49040 en petit texte sur fond clair (2,8:1), mais les composants 3 et 11 le spécifient pour des labels mono 12 px. Le jeton 700 garde la teinte/saturation Or chaud et passe AA (4,63–6,1:1) sur tous les fonds clairs. Appliqué uniquement au petit texte spec sur clair (labels DEMO, liens d'exhibit, numéros de process, beat numbers, figcaptions). #C49040 reste l'or des fonds sombres, cadres et grands titres. — *À valider par le Design Critic / Launch Audit.*
2. **Héro : `min-height` au lieu de `height: 100vh`, + réserve pour le pairing, + H1 en `--type-display-lg`.** Le VDS a dimensionné le héro et `display-xl` autour d'un H1 de 36 caractères (§Copy Lengths). Le H1 verrouillé du Stage 7 fait 74 caractères : en XL il remplit l'écran et expulse le sous-titre + CTA primaire hors du premier viewport (échec du job J1). `display-lg` est la marche suivante de la même échelle Fraunces ; le CTA est visible au premier paint sur 1440×900 et 375×812.
3. **A12b (guilloché clair) dérivé.** Le VDS signalait A12b non généré ; il a été dérivé d'A12a par remappage pixel (traits Nuit sur Plâtre), 400×400 tileable, opacité 8 % conforme.
4. **OG image :** compression à 191 KB (plafond 200 KB) obtenue par léger flou gaussien + quantisation — adoucissement mineur, acceptable pour un visuel de partage.
5. **`role="list"` conservé sur les grilles d'exhibits** (la réinitialisation CSS retire `list-style`, le rôle restaure la sémantique de liste pour VoiceOver/Safari). La règle stylistique `no-redundant-role` de html-validate a été désactivée pour ce motif documenté.
6. **Pages légales servies en FR uniquement** (documents de juridiction française ; le Content Plan note le miroir EN comme optionnel). Le toggle reste présent dans la nav mais le corps légal ne bascule pas.
7. **Alt text :** chaînes FR exactes de l'Asset Plan §9. Les alt EN ne permutent pas avec le toggle (l'attribut suit la langue servie, FR). Limitation connue, cohérente avec « FR is the served, crawlable default ».
8. **Métadonnées :** titres/descriptions FR uniquement (FR canonique). Les variantes EN du §3 ne sont pas injectées au toggle (hors périmètre d'un site statique sans rechargement).

## 3. Verification record — what was actually run

**Tier 1 (static) — all PASS on final state:**
- `node --check js/motion.js` — syntaxe OK.
- `html-validate` (recommended preset) : 14/14 pages **0 erreur**. Corrections faites en boucle : 80× espaces insécables dans les numéros de téléphone, barre sticky `div`→`nav` (aria-label valide), `&` échappé dans le H1 EN d'Offres.
- `stylelint` (config standard) : **0 erreur** de validité (règles purement stylistiques désactivées et listées dans la config).
- Vérificateur d'intégrité maison : liens internes (routes cleanUrls) ✓ · tous les assets référencés existent sur disque ✓ · 1 seul `<h1>`/page ✓ · aucun id dupliqué ✓ · `width`/`height` sur chaque `<img>` ✓ · alt présents ✓ · JSON-LD parse sur chaque page ✓ · commentaires `[CONFIRM]` requis présents ✓ · toutes les `var(--…)` définies (3 propriétés injectées par JS whitelistées avec fallback 0ms) ✓ · **zéro teinte violette** dans tout le CSS ✓ · **zéro phrase bannie** du Content Plan §1 dans le rendu ✓ · sitemap = exactement les 13 routes ✓ · `vercel.json` cleanUrls ✓.

**Tier 2 (runtime, Chromium headless 141 via puppeteer-core) — all PASS on final state, 14/14 pages :**
- Console : 0 erreur · 0 pageerror · 0 requête en échec (HTTP ≥ 400 : aucune).
- Overflow horizontal : **0 px** à 375 px et 1440 px sur chaque page. (Bug réel trouvé et corrigé : `white-space: nowrap` sur les couches `.bi-inline` causait 107–233 px de débordement mobile.)
- **axe-core** (WCAG 2.0/2.1 A + AA), au viewport mobile, états de reveal neutralisés pour auditer l'état final : **0 violation** sur les 14 pages (sanity check : règles « passes » > 0 partout). Violations de contraste réelles trouvées et corrigées via `--or-chaud-700`.
- Interactions exercées : drawer (ouverture, `aria-expanded`, fermeture Échap) ✓ · barre sticky fixe, cellules ≥ 44 px, masquée ≥ 768 px ✓ · toggle FR/EN (`data-lang`+`lang`, visibilité des couches, permutation des href WhatsApp, `aria-pressed`, persistance `sessionStorage` inter-pages, **0 décalage de hauteur** du H1 au basculement) ✓ · accordéon FAQ ouverture/fermeture (WAAPI) ✓ · formulaire : envoi vide → erreurs inline + `aria-invalid` + focus sur le 1er champ invalide, sans navigation ; champs remplis → erreurs effacées, handoff `mailto:` déclenché, note de handoff révélée ✓ · nav `is-scrolled` ✓ · reveals `is-visible` au scroll ✓.
- Contrôle visuel : captures desktop/mobile du héro, d'Offres et d'une sous-page démo inspectées (registre facade/intérieur, badge Recommandé, barre sticky, hallmark).

**Limites honnêtes du périmètre vérifié :** pas de test sur navigateurs réels iOS/Android ni Firefox/Safari ; pas de mesure Lighthouse/Core Web Vitals (poids page d'accueil ≈ 290 KB hors héro, héros WebP 100–250 KB, fonts 272 KB auto-hébergées préchargées — budget VDS respecté sur le papier, à mesurer en prod) ; axe ne remplace pas un audit manuel lecteur d'écran. Ces points relèvent du Stage 13 (Launch Audit).

## 4. Asset processing record

- A01–A11 : recadrés/redimensionnés aux specs §6, WebP+JPEG, variantes mobiles 375×300 pour les exhibits.
- A12a fourni ; **A12b dérivé** (voir déviation 3). A13 OG 1200×630 PNG 191 KB. A14 → favicon.svg dessiné (V sérif Or chaud sur Nuit) + 32/16/apple-touch PNG.
- **A15 hallmark** : SVG dessiné à la main selon le brief §10 (forme fleur à trois pétales, volutes basses symétriques, diamant central, goutte de base ; trait seul, `stroke="currentColor"`, `viewBox 0 0 48 48`, `aria-hidden`, < 2 KB inline) — rendu vérifié visuellement.
- Fonts : Fraunces (normal+italic), Public Sans, IBM Plex Mono 400/500 — woff2 latin + latin-ext, ~272 KB, `@font-face` avec `unicode-range`, préchargement des deux faces critiques.
