const fs = require('fs');

/*
{
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
    fs.writeFile(environmentsFilePath, JSON.stringify(fileContent), () => {
      console.log(`[environments] environments written in ${environmentsFilePath}`);
      resolve(fileContent);
    });
  });
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
