const fs = require('fs');

async function getEnvironments(environmentsFilePath) {
  let environments = await tryGetEnvironmentsFile(environmentsFilePath);
  if (!environments) {
    environments = await createEnvironmentsFile(environmentsFilePath);
  }

  return environments;
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

async function createEnvironmentsFile(environmentsFilePath) {
  const defaultEnvironments = getDefaultEnvironments();
  return new Promise(resolve => {
    fs.writeFile(environmentsFilePath, JSON.stringify(defaultEnvironments), () => {
      console.log(`[environments] default environments created in ${environmentsFilePath}`);
      resolve(defaultEnvironments);
    });
  });
}

function getDefaultEnvironments() {
  return [];
}

module.exports = {
  getEnvironments,
};
