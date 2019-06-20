import { get, writable } from 'svelte/store';
import { confirmRemoveEnvironment, getExportEnvironmentsPath } from '../helpers/dialogs';
import { ensureGetEnvironments, getNextEnvironmentId, writeEnvironments, exportEnvironments } from '../helpers/environments';
import { ensureGetSettings } from '../helpers/settings';

export const environmentsStore = writable(null);
export const settingsStore = writable(null);
export const fullScreenModalStore = writable({ component: null });
export const environmentDetailsStore = writable({ component: null });

initializeStores();

async function initializeStores() {
  const settings = await ensureGetSettings();
  settingsStore.set(settings);
  const environments = await ensureGetEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
  return environments;
}

/* =============*/
/* App settings */
/* =============*/
export async function exportAllEnvironments() {
  const environments = get(environmentsStore);
  const portalEnvironments = environments.map(environment => {
    const { id, ...portableEnvironment } = environment;
    return portableEnvironment;
  });

  const path = getExportEnvironmentsPath();
  if (path) {
    await exportEnvironments(path, portalEnvironments);
  }
}

export async function importEnvironments() {
  //noop
}

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

export async function removeEnvironment(environmentDetails) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  if (!confirmRemoveEnvironment(environmentDetails.name)) return false;

  const remainingEnvironments = environments.filter(environment => environment.id !== environmentDetails.id);
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
    name: '',
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
