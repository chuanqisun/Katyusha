import { writable } from 'svelte/store';
import { getSettings } from '../helpers/settings';

export async function initializeSettingsStore() {
  const settings = await getSettings();
  settingsStore.set(settings);

  return settings;
}

export const settingsStore = writable(null);
