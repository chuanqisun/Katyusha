import { writable } from 'svelte/store';
import { getSettings } from './helpers/settings';
import { getEnvironments } from './helpers/environments';

async function initializeStores() {
  const settings = await getSettings();
  settingsStore.set(settings);

  const environments = await getEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
}

export const settingsStore = writable(null);
export const environmentsStore = writable(null);

initializeStores();
