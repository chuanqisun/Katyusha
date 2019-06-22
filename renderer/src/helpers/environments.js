const fs = require('fs');
import { getNextIdFromArrayOfInts } from './unique-id';
import { writeJsonFile } from './file-system';

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
