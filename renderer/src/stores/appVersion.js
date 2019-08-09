import { get, writable } from 'svelte/store';

import { getMetadata, getAppVersion } from '../helpers/metadata';

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
}
