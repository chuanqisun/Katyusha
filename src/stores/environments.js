import { writable, get } from 'svelte/store';
import { getEnvironments, writeEnvironments } from '../helpers/environments';
import { settingsStore } from './settings';

export async function initializeEnvironmentsStore() {
  const settings = get(settingsStore);
  const environments = await getEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
}

export async function addEnvironment(environmentDetails) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  environments.push(environmentDetails);
  await writeEnvironments(settings.environmentsFilePath, environments);
  environmentsStore.set(environments);
}

export const environmentsStore = writable(null);
