import { writable, get } from 'svelte/store';
import { getEnvironments, writeEnvironments } from '../helpers/environments';
import { settingsStore } from './settings';

export async function initializeEnvironmentsStore() {
  const settings = get(settingsStore);
  const environments = await getEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
  return environments;
}

export async function addEnvironment(environmentDetails) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  environments.push(environmentDetails);
  await writeEnvironments(settings.environmentsFilePath, environments);
  environmentsStore.set(environments);
  return environments;
}

export async function updateEnvironment(environmentDetails) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  const targetEnvironmentIndex = environments.findIndex(environment => environment.name === environmentDetails.name);
  environments[targetEnvironmentIndex] = environmentDetails;
  await writeEnvironments(settings.environmentsFilePath, environments);
  environmentsStore.set(environments);
  return environments;
}

export async function removeEnvironment(environmentName) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  const remainingEnvironments = environments.filter(environment => environment.name !== environmentName);
  await writeEnvironments(settings.environmentsFilePath, remainingEnvironments);
  environmentsStore.set(remainingEnvironments);
  return remainingEnvironments;
}

export const environmentsStore = writable(null);
