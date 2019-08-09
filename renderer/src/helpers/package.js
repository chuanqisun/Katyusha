import packageJson from '../../../package';

export function getLatestReleaseUrl() {
  return packageJson.katyusha.latestReleaseUrl;
}

export function getMetadataUrl() {
  return packageJson.katyusha.metadataUrl;
}

export function getEnvironmentsUrl() {
  return packageJson.katyusha.environmentsUrl;
}
