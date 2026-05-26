// Client HTTP vers le plugin Obsidian
// Utilisé par background.js

const BASE_URL = 'http://localhost:27124';

const ApiClient = {
  async save(entry) {
    const res = await fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  },

  async ping() {
    try {
      const res = await fetch(`${BASE_URL}/ping`, {
        signal: AbortSignal.timeout(2000)
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
