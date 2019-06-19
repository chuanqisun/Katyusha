import { writable, get } from 'svelte/store';
import {
  getSettings,
  getNewEnvironmentsFileDir,
  getEnvironmentsFilePathFromDir,
  updateSettingsFile,
  confirmRemoveOldEnvironmentsFile,
} from '../helpers/settings';
import { getEnvironments, writeEnvironments, confirmRemoveEnvironment, environmentsFileExistsInDir, getNextEnvironmentId } from '../helpers/environments';
import { removeFile, copyFile } from '../helpers/file-system';

export const environmentsStore = writable(null);
export const settingsStore = writable(null);
export const fullScreenModalStore = writable({ component: null });
export const environmentDetailsStore = writable({ component: null });

initializeStores();

async function initializeStores() {
  const settings = await getSettings();
  settingsStore.set(settings);
  const environments = await getEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
  return environments;
}

/* =============*/
/* App settings */
/* =============*/

/* =================*/
/* Environment CRUD */
/* =================*/
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
  const targetEnvironmentIndex = environments.findIndex(environment => environment.id === environmentDetails.id);
  environments[targetEnvironmentIndex] = environmentDetails;
  await writeEnvironments(settings.environmentsFilePath, environments);
  environmentsStore.set(environments);
  return environments;
}

export async function removeEnvironment(environmentName) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  if (!confirmRemoveEnvironment(environmentName)) return false;

  const remainingEnvironments = environments.filter(environment => environment.name !== environmentName);
  await writeEnvironments(settings.environmentsFilePath, remainingEnvironments);
  environmentsStore.set(remainingEnvironments);
  return remainingEnvironments;
}

/* ==================*/
/* Full screen modal */
/* ==================*/
export function openFullScreenModal(component) {
  fullScreenModalStore.set({ component });
}

export function closeFullScreenModal() {
  fullScreenModalStore.set({ component: null });
}

/* =========================*/
/* Environment details form */
/* =========================*/
export function hydrateEnvironmentDetailsFormToCreate() {
  environmentDetailsStore.set({
    id: getNextEnvironmentId(get(environmentsStore)),
    mode: 'create',
    name: 'New environment',
    url: '',
    username: '',
    password: '',
    auth: 'aad-basic',
  });
}

export function hydrateEnvironmentDetailsFormToEditByEnvironmentId(id) {
  const environment = get(environmentsStore).find(environment => environment.id === id);
  environmentDetailsStore.set({ ...environment, mode: 'edit' });
}
/* ==================*/
