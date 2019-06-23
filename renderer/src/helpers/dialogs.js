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

export function getExportEnvironmentsPath() {
  return dialog.showSaveDialog({
    title: `Export sites to file`,
    defaultPath: 'environments.json',
    filters: [
      {
        name: 'json',
        extensions: ['json'],
      },
    ],
  });
}

export function updateDownloadPrompt({ latestVersion, currentVersion, downloadUrl }) {
  const { shell } = require('electron').remote;

  dialog.showMessageBox(
    {
      buttons: ['Open download page', 'Maybe later'],
      title: 'Update available',
      message: `
${latestVersion} is ready for download.
    `.trim(),
      detail: `Your current version is ${currentVersion}.`,
      cancelId: 1,
    },
    response => {
      if (response === 0) {
        shell.openExternal(downloadUrl);
      }
    }
  );
}
