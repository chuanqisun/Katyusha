import { get, writable } from 'svelte/store';

import { getMetadata, getAppVersion } from '../helpers/metadata';
import { updateAvailable, noUpdates } from '../helpers/dialogs';
import { getLatestReleaseUrl } from '../helpers/package';

export const needUpdateStore = writable(null);
export const supportedVersionsStore = writable(null);
export const currentVersionStore = writable(null);

export async function initializeAppVersionStore() {
  const metadata = await getMetadata();
  const currentVersion = getAppVersion();
  currentVersionStore.set(currentVersion);
  const needUpdate = !metadata.supportedVersions.includes(currentVersion);
  needUpdateStore.set(needUpdate);
  supportedVersionsStore.set(metadata.supportedVersions);

  checkUpdate({ silentWhenNoUpdates: true });
}

export function checkUpdate({ silentWhenNoUpdates }) {
  const supportedVersions = get(supportedVersionsStore);
  const latestVersion = supportedVersions[supportedVersions.length - 1];
  const currentVersion = get(currentVersionStore);

  if (currentVersion === latestVersion) {
    !silentWhenNoUpdates && noUpdates({ currentVersion });
  } else {
    const downloadUrl = getLatestReleaseUrl();
    updateAvailable({ latestVersion, currentVersion, downloadUrl });
  }
}
