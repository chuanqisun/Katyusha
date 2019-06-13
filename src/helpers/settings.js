const app = require('electron').remote.app;
const fs = require('fs');
const path = require('path');
const { settingsFilename, environmentsFilename } = require('../../system-config');
const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, settingsFilename);
const environmentsFilePath = path.join(userDataPath, environmentsFilename);

async function getSettings() {
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

module.exports = {
  getSettings,
};
