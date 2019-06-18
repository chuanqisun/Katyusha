const fs = require('fs');
const path = require('path');
import { settingsFilePath, environmentsFilePath } from './app-paths';
import { environmentsFilename } from '../../app.config';

const { dialog } = require('electron').remote;

export async function getSettings() {
  let settings = await tryGetSettingsFile();
  if (!settings) {
    settings = await createSettingsFile();
  }

  return settings;
}

export function getNewEnvironmentsFileDir() {
  const paths = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  });

  return paths;
}

export function getEnvironmentsFilePathFromDir(dir) {
  return path.join(dir, environmentsFilename);
}

export function confirmRemoveOldEnvironmentsFile(adoptedExistingFile, newEnvironmentCount) {
  let xEnvironmentsAre = '';
  if (newEnvironmentCount === 0) {
    xEnvironmentsAre = 'No environments are';
  } else if (newEnvironmentCount === 1) {
    xEnvironmentsAre = 'One environment is';
  } else {
    xEnvironmentsAre = `${newEnvironmentCount} environments are`;
  }

  const message = adoptedExistingFile
    ? `Success! ${xEnvironmentsAre} found in new profile. Do you want to remove the old environment profile?`
    : `Success! ${xEnvironmentsAre} moved into the new location. Do you want to remove the old environment profile?`;

  const decision = dialog.showMessageBox({
    type: 'question',
    message: message,
    defaultId: 0,
    cancelId: 1,
    noLink: true,
    buttons: ['Yes, remove it', 'No, keep it'],
  });

  return decision === 0;
}

export async function updateSettingsFile(newFileContent) {
  return new Promise(resolve => {
    fs.writeFile(settingsFilePath, JSON.stringify(newFileContent), () => {
      console.log(`[settings] settings updated in ${settingsFilePath}`);
      resolve(settingsFilePath);
    });
  });
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
  return new Promise(resolve => {
    fs.writeFile(settingsFilePath, JSON.stringify(defaultSettings), () => {
      console.log(`[settings] default settings created in ${settingsFilePath}`);
      resolve(defaultSettings);
    });
  });
}

function getDefaultSettings() {
  return {
    environmentsFilePath: environmentsFilePath,
  };
}
