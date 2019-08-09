import { get, writable } from 'svelte/store';
import { getEnvironmentsUrl, getEnvironmentsEditUrl } from '../helpers/package';
const { BrowserWindow } = require('electron').remote;

export async function editEnvrionments() {
  return new Promise((resolve, reject) => {
    console.log('[environment] edit environment: start');
    const tempWindow = new BrowserWindow({
      width: 800,
      height: 600,
    });

    tempWindow.setMenu(null);
    tempWindow.loadURL(getEnvironmentsEditUrl());

    tempWindow.webContents.on('dom-ready', () => {
      const url = tempWindow.webContents.getURL();
      if (url.indexOf('https://login.microsoftonline.com') === 0) {
        tempWindow.destroy();
        console.log('[environment] not signed in');
        resolve(false);
      }

      if (url.indexOf('https://microsoft.sharepoint.com') === 0) {
        console.log('[environment] editor opened');
        resolve(true);
      }
    });
  });
}

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
          resolve(null);
        }
        console.log('[environment] get environment: json fetched');
      });
    });
  });
}

export const environmentsStore = writable(null);
