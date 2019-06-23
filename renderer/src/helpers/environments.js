const fs = require('fs');
import { getNextIdFromArrayOfInts } from './unique-id';
import { readJsonFile, writeJsonFile } from './file-system';

export async function ensureGetEnvironments(environmentsFilePath) {
  let environments = await tryGetEnvironmentsFile(environmentsFilePath);
  if (!environments) {
    const fileContent = getDefaultEnvironments();
    environments = await writeEnvironments(environmentsFilePath, fileContent);
  }

  return environments;
}

export async function writeEnvironments(environmentsFilePath, fileContent) {
  await writeJsonFile(environmentsFilePath, fileContent);
  console.log(`[environments] environments written in ${environmentsFilePath}`);
  return fileContent;
}

export async function exportEnvironments(exportPath, environments) {
  await writeJsonFile(exportPath, environments);
  console.log(`[environments] environments exported to ${exportPath}`);
}

export function getNextEnvironmentId(environments) {
  const existingIds = environments.map(environment => environment.id);
  return getNextIdFromArrayOfInts(existingIds);
}

async function tryGetEnvironmentsFile(environmentsFilePath) {
  return await readJsonFile(environmentsFilePath)
    .then(object => {
      console.log(`[environments] read from ${environmentsFilePath} success`);
      return object;
    })
    .catch(err => {
      console.log(`[environments] read from ${environmentsFilePath} failed: ${err}`);
      return null;
    });
}

function getDefaultEnvironments() {
  return [];
}
