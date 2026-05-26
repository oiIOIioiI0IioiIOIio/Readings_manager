// Utilitaires storage — importé si besoin depuis popup ou background

const Storage = {
  async get(key) {
    const data = await browser.storage.local.get(key);
    return data[key];
  },

  async set(key, value) {
    await browser.storage.local.set({ [key]: value });
  },

  async getQueue() {
    return (await this.get('queue')) || [];
  },

  async clearQueue() {
    await this.set('queue', []);
  },

  async getRecentTags() {
    return (await this.get('recentTags')) || [];
  }
};
