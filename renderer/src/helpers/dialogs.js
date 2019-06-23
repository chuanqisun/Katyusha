const { dialog } = require('electron').remote;

export function confirmRemoveEnvironment(environmentName) {
  const decision = dialog.showMessageBox({
    type: 'question',
    message: `Are you sure you want to remove ${environmentName}?`,
    detail: `You can't recover an environment once it is removed.`,
    defaultId: 0,
    cancelId: 1,
    noLink: true,
    buttons: ['Yes', 'Keep it'],
  });

  return decision === 0;
}

export function importEnvironmentsFromFile() {
  return dialog.showOpenDialog({
    title: `Import sites from file`,
    defaultPath: 'environments.json',
    filters: [
      {
        name: 'json',
        extensions: ['json'],
      },
    ],
  });
}

export function exportEnvironmentToFile() {
  return dialog.showSaveDialog({
    title: `Export sites to file`,
    filters: [
      {
        name: 'json',
        extensions: ['json'],
      },
    ],
  });
}

export function updateAvailable({ latestVersion, currentVersion, downloadUrl }) {
  const { shell } = require('electron').remote;

  dialog.showMessageBox(
    {
      type: 'question',
      message: `Update available`,
      detail: `A newer version ${latestVersion} is available. Your current version is ${currentVersion}.`,
      defaultId: 0,
      cancelId: 1,
      noLink: true,
      buttons: ['Download from GitHub', 'Cancel'],
    },
    response => {
      if (response === 0) {
        shell.openExternal(downloadUrl);
      }
    }
  );
}
