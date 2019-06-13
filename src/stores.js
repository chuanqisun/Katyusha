import { writable } from 'svelte/store';
import { getSettings } from './helpers/settings';
import { getEnvironments } from './helpers/environments';

async function initializeStores() {
  const settings = await getSettings();
  settingsStore.set(settings);

  const environments = await getEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
}

function createSettingsStore() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    set,
  };
}

function createEnvironmentsStore() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    set,
  };
}

export const settingsStore = createSettingsStore();
export const environmentsStore = createEnvironmentsStore();

initializeStores();
