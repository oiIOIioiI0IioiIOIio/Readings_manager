# Reading Manager

Un système de gestion de lecture en deux parties : un plugin Obsidian pour stocker et enrichir vos entrées, et une extension Firefox pour capturer des URLs en un clic.

---

## Architecture

```
reading-manager/
├── obsidian-plugin/          # Plugin Obsidian
│   ├── main.js
│   ├── manifest.json
│   └── styles.css
└── firefox-extension/        # Extension Firefox
    ├── manifest.json
    ├── popup.html
    ├── popup.js
    ├── background.js
    └── icons/
        └── icon48.png
```

---

## Plugin Obsidian

### Fonctionnalités
- Ajout d'entrées de lecture (articles, vidéos, livres, publications)
- Enrichissement automatique de métadonnées via OpenGraph / oEmbed
- Intégration Zotero
- Interface modale dans Obsidian

### Installation

1. Cloner ce repo
2. Copier le dossier `obsidian-plugin/` dans `.obsidian/plugins/reading-manager/`
3. Activer le plugin dans **Paramètres → Plugins communautaires**

### Prérequis
- Obsidian `≥ 1.4.0`
- Le plugin doit être en mode desktop

---

## Extension Firefox

### Fonctionnalités
- Capture l'URL et le titre de l'onglet actif
- Envoi vers le plugin Obsidian via requête locale
- File d'attente offline avec retry automatique (via `alarms`)

### Installation (développement)

1. Ouvrir `about:debugging` dans Firefox
2. Cliquer **Charger un module complémentaire temporaire**
3. Sélectionner le dossier `firefox-extension/`

### Installation (production)

> AMO submission en cours — l'extension n'est pas encore publiée.

En attendant, charger manuellement via `about:debugging`.

### Prérequis
- Firefox `≥ 140.0`
- Le plugin Obsidian doit tourner en parallèle

---

## Workflow complet

```
Firefox (URL) → Extension → requête HTTP locale → Plugin Obsidian → Note Markdown
```

1. Sur n'importe quelle page, cliquer l'icône de l'extension
2. Remplir / confirmer les métadonnées dans le popup
3. L'entrée apparaît automatiquement dans votre vault Obsidian

---

## Stack

| Composant | Techno |
|---|---|
| Plugin Obsidian | TypeScript / Obsidian API |
| Extension Firefox | Vanilla JS / WebExtensions API |
| Stockage | Markdown + frontmatter YAML |
| Métadonnées | OpenGraph, oEmbed, Zotero API |


## Licence

MIT
