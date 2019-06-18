import { initializeEnvironmentsStore } from './environments';
import { initializeSettingsStore } from './settings';

async function initializeStores() {
  await initializeSettingsStore();
  await initializeEnvironmentsStore();
}

initializeStores();

export * from './environments';
export * from './settings';
export * from './fullScreenModal';
export * from './environmentDetails';
