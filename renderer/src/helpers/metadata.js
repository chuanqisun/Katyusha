const https = require('https');
import packageJson from '../../../package';

export function getLatestReleaseUrl() {
  return packageJson.katyusha.latestReleaseUrl;
}

export function getAppVersion() {
  const { app } = require('electron').remote;
  return app.getVersion();
}

export async function getMetadata() {
  const url = packageJson.katyusha.metadataUrl;
  return new Promise(resolve => {
    https
      .get(url, resp => {
        let data = '';

        resp.on('data', chunk => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', err => {
        console.log('[metadata]: parsing json error' + err.message);
        resolve({});
      });
  });
}
