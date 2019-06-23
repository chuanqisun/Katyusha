const fs = require('fs');

export async function removeFile(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

export async function moveFile(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

export async function copyFile(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(oldPath, newPath, err => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

export async function readJsonFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, undefined, (err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        const object = JSON.parse(data);
        resolve(object);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

export async function writeJsonFile(path, object) {
  return new Promise((resolve, reject) => {
    let fileData;
    try {
      fileData = stringify(object);
    } catch (stringifyError) {
      return reject(stringifyError);
    }

    fs.writeFile(path, fileData, err => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

function stringify(object) {
  return JSON.stringify(object, undefined, 2);
}
