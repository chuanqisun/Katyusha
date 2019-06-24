import { get, writable } from 'svelte/store';
import { confirmRemoveEnvironment, exportEnvironmentToFile, importEnvironmentsFromFile } from '../helpers/dialogs';
import {
  ensureGetEnvironments,
  getNextEnvironmentId,
  writeEnvironments,
  exportEnvironments,
  readEnvironments,
  mergeEnvironments,
} from '../helpers/environments';
import { ensureGetSettings } from '../helpers/settings';
import { getMetadata, getAppVersion } from '../helpers/metadata';

export const environmentsStore = writable(null);
export const settingsStore = writable(null);
export const fullScreenModalStore = writable({ component: null });
export const environmentDetailsStore = writable(null);
export const updateServiceStore = writable({});

initializeStores();

async function initializeStores() {
  intializeMetadataStore(); // non-blocking
  const settings = await ensureGetSettings();
  settingsStore.set(settings);
  const environments = await ensureGetEnvironments(settings.environmentsFilePath);
  environmentsStore.set(environments);
  return environments;
}

/* =========*/
/* Metadata */
/* =========*/
export async function intializeMetadataStore() {
  const metadata = await getMetadata();
  const currentVersion = getAppVersion();
  const needUpdate = !metadata.supportedVersions.includes(currentVersion);
  updateServiceStore.set({
    needUpdate,
    supportedVersions: metadata.supportedVersions,
  });
}

/* =============*/
/* App settings */
/* =============*/
export async function importEnvironments() {
  const importFilePaths = importEnvironmentsFromFile();
  let importFilePath;
  if (importFilePaths && importFilePaths[0]) {
    importFilePath = importFilePaths[0];
  } else {
    return;
  }

  const incomingEnvironments = await readEnvironments(importFilePath);
  if (!incomingEnvironments) {
    return;
  }

  const existingEnvironments = get(environmentsStore);
  const mergedEnvironments = mergeEnvironments(incomingEnvironments, existingEnvironments);

  const settings = get(settingsStore);
  await writeEnvironments(settings.environmentsFilePath, mergedEnvironments);
  environmentsStore.set(mergedEnvironments);
  return mergeEnvironments;
}

export async function exportAllEnvironments() {
  const environments = get(environmentsStore);
  const portalEnvironments = environments.map(environment => {
    const { id, ...portableEnvironment } = environment;
    return portableEnvironment;
  });

  const path = exportEnvironmentToFile();
  if (path) {
    await exportEnvironments(path, portalEnvironments);
  }
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

export async function reorderEnvironments(orderedIdList) {
  const settings = get(settingsStore);
  const environments = get(environmentsStore);
  const reorderedEnvironments = orderedIdList.map(id => {
    const matchingEnvironment = environments.find(environment => environment.id === id);
    return { ...matchingEnvironment };
  });
  await writeEnvironments(settings.environmentsFilePath, reorderedEnvironments);
  environmentsStore.set(reorderedEnvironments);

  return reorderedEnvironments;
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
    auth: 'manual',
  });
}

export function hydrateEnvironmentDetailsFormToEditByEnvironmentId(id) {
  const environment = get(environmentsStore).find(environment => environment.id === id);
  environmentDetailsStore.set({ ...environment, mode: 'edit' });
}
/* ==================*/
