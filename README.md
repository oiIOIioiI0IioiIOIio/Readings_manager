# Reading Manager

Un plugin Obsidian + une extension Firefox pour capturer et organiser vos lectures sans friction.

```
Firefox (URL) → Extension → HTTP local → Plugin Obsidian → Note Markdown
```

---

## Ce que ça fait

- Cliquer sur l'icône dans Firefox envoie l'URL courante dans votre vault
- Les métadonnées (titre, auteur, date) sont récupérées automatiquement
- Tout reste local — pas de compte, pas de cloud

---

## Installation

### 1. Plugin Obsidian

> Le plugin doit tourner en permanence pour recevoir les URLs depuis Firefox.

```bash
git clone https://github.com/ton-user/reading-manager
```

Copier le dossier `obsidian-plugin/` dans :

```
<votre-vault>/.obsidian/plugins/reading-manager/
```

Puis dans Obsidian :
**Paramètres → Plugins communautaires → Activer Reading Manager**

---

### 2. Extension Firefox

Télécharger le `.xpi` depuis la page [Releases](../../releases).

Dans Firefox :
**`about:addons` → ⚙️ → Installer depuis un fichier → sélectionner le `.xpi`**

> L'extension n'est pas encore signée AMO. Firefox peut afficher un avertissement — c'est normal, vous pouvez continuer.

---

### 3. Vérifier que ça fonctionne

1. Ouvrir n'importe quelle page dans Firefox
2. Cliquer sur l'icône Reading Manager
3. La note apparaît dans votre vault dans les secondes qui suivent

Si rien ne se passe, vérifier que le plugin Obsidian est bien actif — c'est la cause numéro un.

---

## Structure du projet

```
reading-manager/
├── obsidian-plugin/
│   ├── main.js
│   ├── manifest.json
│   └── styles.css
└── firefox-extension/
    ├── manifest.json
    ├── popup.html
    ├── popup.js
    ├── background.js
    └── icons/
        └── icon48.png
```

---

## FAQ

**L'extension envoie l'URL mais rien n'arrive dans Obsidian.**
Le plugin Obsidian n'est probablement pas actif. Ouvrir Obsidian et vérifier dans les plugins communautaires.

**Je suis offline au moment de la capture. L'URL est perdue ?**
Non. L'extension met la requête en file d'attente et réessaie automatiquement dès que le plugin est joignable.

**Les métadonnées sont incomplètes ou fausses.**
Certains sites ne servent pas de balises OpenGraph propres. Vous pouvez les corriger manuellement directement dans la note générée.

**Ça marche avec LibreWolf ?**
Oui. LibreWolf est basé sur Firefox et supporte les extensions WebExtensions standard.

**Ça marche avec Chrome ?**
Pas encore. C'est dans la roadmap.

**Mon vault est sur un cloud (iCloud, Dropbox...). Ça pose un problème ?**
Non. Le plugin écrit directement dans le dossier local du vault, peu importe où il est synchronisé.

## Licence

MIT
