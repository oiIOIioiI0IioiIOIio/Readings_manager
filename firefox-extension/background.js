const OBSIDIAN_API = 'http://localhost:27124';

browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === 'saveEntry') {
    return await trySaveEntry(message.data);
  }
});

async function trySaveEntry(entry) {
  try {
    const response = await fetch(`${OBSIDIAN_API}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: entry }),
      signal: AbortSignal.timeout(4000)
    });

    if (response.ok) {
      return { success: true };
    } else {
      const err = await response.text();
      return { success: false, error: err };
    }
  } catch (e) {
    await queueEntry(entry);
    return { queued: true };
  }
}

async function queueEntry(entry) {
  const data = await browser.storage.local.get('queue');
  const queue = data.queue || [];
  queue.push(entry);
  await browser.storage.local.set({ queue });
}

browser.alarms.create('retryQueue', { periodInMinutes: 2 });

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'retryQueue') {
    await processQueue();
  }
});

async function processQueue() {
  const data = await browser.storage.local.get('queue');
  const queue = data.queue || [];
  if (queue.length === 0) return;

  const remaining = [];
  for (const entry of queue) {
    try {
      const response = await fetch(`${OBSIDIAN_API}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry: entry }),
        signal: AbortSignal.timeout(4000)
      });
      if (!response.ok) remaining.push(entry);
    } catch {
      remaining.push(entry);
    }
  }

  await browser.storage.local.set({ queue: remaining });
}
