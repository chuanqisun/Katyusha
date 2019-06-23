const fs = require('fs');
const app = require('electron').remote.app;
const path = require('path');
import { readJsonFile, writeJsonFile } from './file-system';

const settingsFilename = 'settings.json';
const environmentsFilename = 'environments.json';
const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, settingsFilename);
const environmentsFilePath = path.join(userDataPath, environmentsFilename);

export async function ensureGetSettings() {
  let settings = await tryGetSettingsFile();
  if (!settings) {
    settings = await createSettingsFile();
  }

  return settings;
}

async function tryGetSettingsFile() {
  return await readJsonFile(settingsFilePath)
    .then(object => {
      console.log(`[settings] read from ${settingsFilePath} success`);
      return object;
    })
    .catch(err => {
      console.log(`[settings] read from ${settingsFilePath} failed: ${err}`);
      return null;
    });
}

async function createSettingsFile() {
  const defaultSettings = getDefaultSettings();
  await writeJsonFile(settingsFilePath, defaultSettings);
  console.log(`[settings] default settings created in ${settingsFilePath}`);
  return defaultSettings;
}

function getDefaultSettings() {
  return {
    environmentsFilePath: environmentsFilePath,
  };
}
