import { writable } from 'svelte/store';
import { getSettings, getNewEnvironmentsFileDir, getEnvironmentsFilePathFromDir, updateSettingsFile } from '../helpers/settings';
import { environmentsFileExistsInDir } from '../helpers/environments';
import { removeFile, moveFile } from '../helpers/file-system';

export async function initializeSettingsStore() {
  const settings = await getSettings();
  settingsStore.set(settings);

  return settings;
}

export async function changeEnvironmentsFilePath() {
  debugger;
  const newDirs = getNewEnvironmentsFileDir();
  if (newDirs && newDirs[0]) {
    const environmentsFileExists = await environmentsFileExistsInDir(newDirs[0]);
    const settings = await getSettings();
    const oldPath = settings.environmentsFilePath;
    const newPath = getEnvironmentsFilePathFromDir(newDirs[0]);

    if (environmentsFileExists) {
      //1. environments.json exists in new location
      console.log(`[settings] remove ${oldPath}`);
      removeFile(oldPath);
    } else {
      //2. environments.json doesn't exist in new location => move old file to new location
      console.log(`[settings] move ${oldPath} to ${newPath}`);
      moveFile(oldPath, newPath);
    }

    settings.environmentsFilePath = newPath;
    updateSettingsFile(settings);
    settingsStore.set(settings);
  } else return false;
}

export const settingsStore = writable(null);
