import { writable, get } from 'svelte/store';
import {
  getSettings,
  getNewEnvironmentsFileDir,
  getEnvironmentsFilePathFromDir,
  updateSettingsFile,
  confirmRemoveOldEnvironmentsFile,
} from '../helpers/settings';
import { environmentsFileExistsInDir } from '../helpers/environments';
import { removeFile, copyFile } from '../helpers/file-system';
import { initializeEnvironmentsStore, environmentsStore } from './environments';

export async function initializeSettingsStore() {
  const settings = await getSettings();
  settingsStore.set(settings);

  return settings;
}

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

export const settingsStore = writable(null);
