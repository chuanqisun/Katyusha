const { BrowserWindow } = require('electron').remote;

import { get, writable } from 'svelte/store';
import { getEnvironmentsUrl } from '../helpers/package';

export const authStatusStore = writable(null);

export async function checkSignInStatus() {
  authStatusStore.set('checking');
  return new Promise((resolve, reject) => {
    console.log('[auth] check login status: start');
    const tempWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });

    tempWindow.loadURL(getEnvironmentsUrl());

    tempWindow.webContents.on('dom-ready', () => {
      const url = tempWindow.webContents.getURL();
      if (url.indexOf('https://login.microsoftonline.com') === 0) {
        tempWindow.destroy();
        authStatusStore.set('signed-out');
        console.log('[auth] check sign in status: not signed in');
        resolve(false);
      }

      if (url.indexOf('https://microsoft.sharepoint.com') === 0) {
        tempWindow.destroy();
        authStatusStore.set('signed-in');
        console.log('[auth] check sign in status: signed in');
        resolve(true);
      }
    });
  });
}

export async function signIn() {
  return new Promise((resolve, reject) => {
    console.log('[auth] sign in: start');
    const isSignedIn = get(authStatusStore) === 'signed-in' && false;
    if (isSignedIn) {
      console.log('[auth] sign in: already signed');
      resolve(true);
    } else {
      authStatusStore.set('signing-in');
      const { screen, getCurrentWindow } = require('electron').remote;
      let display = screen.getPrimaryDisplay();
      let width = display.bounds.width;

      const tempWindow = new BrowserWindow({
        parent: getCurrentWindow(),
        modal: true,
        width: 436,
        height: 808,
        x: width - 444,
        y: 16,
      });

      tempWindow.setMenu(null);

      tempWindow.loadURL(getEnvironmentsUrl());

      tempWindow.webContents.on('dom-ready', () => {
        const url = tempWindow.webContents.getURL();
        if (url.indexOf('https://login.microsoftonline.com') === 0) {
          console.log('[auth] sign in: SSO page displayed');
        }

        if (url.indexOf('https://microsoft.sharepoint.com') === 0) {
          console.log('[auth] sign in: success. Close window');
          tempWindow.webContents.session.flushStorageData();
          tempWindow.destroy();
          authStatusStore.set('signed-in');
          resolve(true);
        }
      });
    }
  });
}

export async function signOut() {
  return new Promise((resolve, reject) => {
    console.log('[account] sign out: start');

    const tempWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });

    tempWindow.loadURL(getEnvironmentsUrl());

    tempWindow.webContents.on('dom-ready', () => {
      tempWindow.webContents.session.clearStorageData();
      tempWindow.webContents.session.clearCache(() => {});
      tempWindow.webContents.session.clearHostResolverCache();
      tempWindow.webContents.session.clearAuthCache();
      console.log('[account] sign out: success. all data cleared');
      tempWindow.destroy();
      authStatusStore.set('signed-out');
      resolve(true);
    });
  });
}
