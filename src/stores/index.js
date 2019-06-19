import { writable, get } from 'svelte/store';
import {
  getSettings,
  getNewEnvironmentsFileDir,
  getEnvironmentsFilePathFromDir,
  updateSettingsFile,
  confirmRemoveOldEnvironmentsFile,
} from '../helpers/settings';
import { getEnvironments, writeEnvironments, confirmRemoveEnvironment, environmentsFileExistsInDir } from '../helpers/environments';
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

// TODO refactor into export/import
export async function changeEnvironmentsFilePath() {
  const newDirs = getNewEnvironmentsFileDir();
  if (newDirs && newDirs[0]) {
    const environmentsFileExists = await environmentsFileExistsInDir(newDirs[0]);
    const settings = await getSettings();
    const oldPath = settings.environmentsFilePath;
    const newPath = getEnvironmentsFilePathFromDir(newDirs[0]);

    if (environmentsFileExists) {
      //1. environments.json exists in new location
      // noop
    } else {
      //2. environments.json doesn't exist in new location => copy old file to new location
      console.log(`[settings] copied ${oldPath} to ${newPath}`);
      copyFile(oldPath, newPath);
    }

    settings.environmentsFilePath = newPath;
    await updateSettingsFile(settings);

    settingsStore.set(settings);
    await initializeEnvironmentsStore();

    if (confirmRemoveOldEnvironmentsFile(environmentsFileExists, get(environmentsStore).length)) {
      console.log(`[settings] remove ${oldPath}`);
      await removeFile(oldPath);
    }
  } else return false;
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

// TODO use id instead of name
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
    mode: 'create',
    name: 'New environment',
    url: '',
    username: '',
    password: '',
    auth: 'aad-basic',
  });
}

export function hydrateEnvironmentDetailsFormToEdit(environment) {
  environmentDetailsStore.set({ ...environment, mode: 'edit' });
}
/* ==================*/
