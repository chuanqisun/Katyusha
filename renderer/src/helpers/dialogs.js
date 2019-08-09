const { dialog } = require('electron').remote;

export function updateAvailable({ latestVersion, currentVersion, downloadUrl }) {
  dialog.showMessageBox(
    {
      title: 'Katyusha',
      type: 'question',
      message: `Updates are available`,
      detail: `The latest version is ${latestVersion}. Your current version is ${currentVersion}.`,
      defaultId: 0,
      cancelId: 1,
      noLink: true,
      buttons: ['Download from GitHub', 'Cancel'],
    },
    response => {
      if (response === 0) {
        const { shell } = require('electron').remote;
        shell.openExternal(downloadUrl);
      }
    }
  );
}

export function noUpdates({ currentVersion }) {
  dialog.showMessageBox({
    title: 'Katyusha',
    type: 'info',
    message: `There are no updates available. Your version ${currentVersion} is the latest.`,
    noLink: true,
    buttons: ['OK'],
  });
}
