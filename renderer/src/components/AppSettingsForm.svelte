<script>
  import {
    closeFullScreenModal,
    importEnvironments,
    exportAllEnvironments,
    environmentsStore,
    updateServiceStore
  } from "../stores";
  import { updateAvailable, noUpdates } from "../helpers/dialogs";
  import { getLatestReleaseUrl, getAppVersion } from "../helpers/metadata";

  function onCheckUpdate() {
    const { supportedVersions } = $updateServiceStore;
    const latestVersion = supportedVersions[supportedVersions.length - 1];
    const currentVersion = getAppVersion();

    if (currentVersion === latestVersion) {
      noUpdates({ currentVersion });
    } else {
      const downloadUrl = getLatestReleaseUrl();
      updateAvailable({ latestVersion, currentVersion, downloadUrl });
    }
  }

  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      closeFullScreenModal();
    }
  }

  async function onImport() {
    await importEnvironments();
    closeFullScreenModal();
  }
  async function onExport() {
    exportAllEnvironments();
  }
</script>

<style>
  .settings-items {
    display: grid;
    gap: 1rem;
  }
</style>

<form class="form" on:submit={onSubmit}>
  <div class="settings-items">
    {#if $updateServiceStore.needUpdate}
      <button
        on:click={onCheckUpdate}
        class="btn btn--icon-text btn--primary"
        type="button">
        <svg class="btn__icon">
          <use xlink:href="#svg-download-cloud" />
        </svg>
        <span class="btn__text">Get updates</span>
      </button>
    {:else}
      <button
        on:click={onCheckUpdate}
        class="btn btn--icon-text btn--secondary"
        type="button">
        <svg class="btn__icon">
          <use xlink:href="#svg-refresh-cw" />
        </svg>
        <span class="btn__text">Check for updates</span>
      </button>
    {/if}
    <button
      on:click={onImport}
      class="btn btn--icon-text btn--secondary"
      type="button">
      <svg class="btn__icon">
        <use xlink:href="#svg-plus" />
      </svg>
      <span class="btn__text">Import sites from file</span>
    </button>
    <button
      on:click={onExport}
      class="btn btn--icon-text btn--secondary"
      type="button">
      <svg class="btn__icon">
        <use xlink:href="#svg-external-link" />
      </svg>
      <span class="btn__text">
        Export all sites ({$environmentsStore.length}) to file
      </span>
    </button>
  </div>
</form>
