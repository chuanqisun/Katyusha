const fs = require('fs');
const app = require('electron').remote.app;
const path = require('path');
import { settingsFilename, environmentsFilename } from '../../app.config';
import { writeJsonFile } from './file-system';

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
  return new Promise(resolve => {
    console.log(`[settings] reading ${settingsFilePath}`);
    fs.readFile(settingsFilePath, (err, data) => {
      if (!err) {
        console.log(`[settings] success`);
        resolve(JSON.parse(data));
      } else {
        console.log(err);
        console.log('[settings] file does not exist');
        resolve(null);
      }
    });
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
