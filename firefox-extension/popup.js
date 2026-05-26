document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('status');

  // Récupère l'onglet actif
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  document.getElementById('url').value = tab.url || '';
  document.getElementById('title').value = tab.title || '';

  // Détecte le type automatiquement selon l'URL
  autoDetectType(tab.url);

  // Charge les tags récents depuis le storage
  loadRecentTags();

  document.getElementById('save').addEventListener('click', async () => {
    const entry = {
      url: document.getElementById('url').value,
      title: document.getElementById('title').value,
      type: document.getElementById('type').value,
      status: document.getElementById('status-select') 
        ? document.getElementById('status-select').value 
        : document.getElementById('status').value,
      tags: document.getElementById('tags').value
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      note: document.getElementById('note').value,
      savedAt: new Date().toISOString()
    };

    statusEl.className = 'pending';
    statusEl.textContent = 'Envoi en cours...';

    const result = await browser.runtime.sendMessage({
      action: 'saveEntry',
      data: entry
    });

    if (result.success) {
      statusEl.className = 'success';
      statusEl.textContent = '✓ Sauvegardé dans Obsidian';
      saveRecentTags(entry.tags);
      setTimeout(() => window.close(), 1200);
    } else if (result.queued) {
      statusEl.className = 'pending';
      statusEl.textContent = '⏳ Hors ligne — sauvegardé localement';
      setTimeout(() => window.close(), 1800);
    } else {
      statusEl.className = 'error';
      statusEl.textContent = '✗ Erreur : ' + (result.error || 'inconnue');
    }
  });
});

function autoDetectType(url) {
  const select = document.getElementById('type');
  if (!url) return;
  if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('tiktok.com')) {
    select.value = 'video';
  } else if (url.includes('twitter.com') || url.includes('x.com') || url.includes('bsky.app')) {
    select.value = 'tweet';
  } else if (url.includes('podcast') || url.includes('spotify.com/episode') || url.includes('deezer.com/episode')) {
    select.value = 'podcast';
  }
}

async function loadRecentTags() {
  const data = await browser.storage.local.get('recentTags');
  if (data.recentTags && data.recentTags.length > 0) {
    const input = document.getElementById('tags');
    input.setAttribute('list', 'tags-datalist');
    const dl = document.createElement('datalist');
    dl.id = 'tags-datalist';
    data.recentTags.forEach(tag => {
      const opt = document.createElement('option');
      opt.value = tag;
      dl.appendChild(opt);
    });
    document.body.appendChild(dl);
  }
}

async function saveRecentTags(newTags) {
  const data = await browser.storage.local.get('recentTags');
  const existing = data.recentTags || [];
  const merged = [...new Set([...newTags, ...existing])].slice(0, 50);
  await browser.storage.local.set({ recentTags: merged });
}
