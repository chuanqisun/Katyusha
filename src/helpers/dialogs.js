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
    title: `Export to file`,
    defaultPath: 'environments.json',
    filters: [
      {
        name: 'json',
        extensions: ['json'],
      },
    ],
  });
}
