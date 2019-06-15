import { initializeEnvironmentsStore } from './environments';
import { initializeSettingsStore } from './settings';

async function initializeStores() {
  const settings = await initializeSettingsStore();
  await initializeEnvironmentsStore(settings);
}

initializeStores();

export * from './environments';
export * from './settings';
export * from './fullScreenModal';
