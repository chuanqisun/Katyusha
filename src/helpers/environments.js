const fs = require('fs');
const path = require('path');
const { dialog } = require('electron').remote;
import { environmentsFilename } from '../../app.config';
import { getNextIdFromArrayOfInts } from './unique-id';

/*
{
  id: number;
  name: string;
  url: string;
  auth: 'aad-basic' | 'manual';
  username?: string;
  password?: string;
}
*/
export async function getEnvironments(environmentsFilePath) {
  let environments = await tryGetEnvironmentsFile(environmentsFilePath);
  if (!environments) {
    const fileContent = getDefaultEnvironments();
    environments = await writeEnvironments(environmentsFilePath, fileContent);
  }

  return environments;
}

export async function writeEnvironments(environmentsFilePath, fileContent) {
  return new Promise(resolve => {
    fs.writeFile(environmentsFilePath, JSON.stringify(fileContent, undefined, 2), () => {
      console.log(`[environments] environments written in ${environmentsFilePath}`);
      resolve(fileContent);
    });
  });
}

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

export async function environmentsFileExistsInDir(dir) {
  const environments = await tryGetEnvironmentsFile(path.join(dir, environmentsFilename));
  return !!environments;
}

export function getNextEnvironmentId(environments) {
  const existingIds = environments.map(environment => environment.id);
  return getNextIdFromArrayOfInts(existingIds);
}

async function tryGetEnvironmentsFile(environmentsFilePath) {
  return new Promise(resolve => {
    console.log(`[environments] reading ${environmentsFilePath}`);
    fs.readFile(environmentsFilePath, (err, data) => {
      if (!err) {
        console.log(`[environments] success`);
        resolve(JSON.parse(data));
      } else {
        console.log(err);
        console.log('[environments] file does not exist');
        resolve(null);
      }
    });
  });
}

function getDefaultEnvironments() {
  return [];
}
