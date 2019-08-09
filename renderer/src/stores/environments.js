import { get, writable } from 'svelte/store';
import { getEnvironmentsUrl } from '../helpers/package';
const { BrowserWindow } = require('electron').remote;

export async function loadEnvironments() {
  return new Promise((resolve, reject) => {
    console.log('[environment] get environment: start');
    const tempWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });

    tempWindow.loadURL(getEnvironmentsUrl());

    tempWindow.webContents.on('dom-ready', () => {
      tempWindow.webContents.executeJavaScript(`document.querySelector('pre').innerText`, undefined, result => {
        tempWindow.destroy();
        try {
          const resultObject = JSON.parse(result);
          environmentsStore.set(resultObject);
          resolve(resultObject);
        } catch (e) {
          console.error(e);
          environmentsStore.set([]);
          resolve([]);
        }
        console.log('[environment] get environment: json fetched');
      });
    });
  });
}

export const environmentsStore = writable(null);
