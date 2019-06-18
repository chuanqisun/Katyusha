const fs = require('fs');

export async function removeFile(path) {
  return new Promise(resolve => {
    fs.unlink(path, err => {
      if (err) {
        console.error(err);
        resolve(false);
      }
      resolve(true);
    });
  });
}

export async function moveFile(oldPath, newPath) {
  return new Promise(resolve => {
    fs.rename(oldPath, newPath, err => {
      if (err) throw err;
      resolve(false);
    });

    resolve(true);
  });
}

export async function copyFile(oldPath, newPath) {
  return new Promise(resolve => {
    fs.copyFile(oldPath, newPath, err => {
      if (err) throw err;
      resolve(false);
    });

    resolve(true);
  });
}
