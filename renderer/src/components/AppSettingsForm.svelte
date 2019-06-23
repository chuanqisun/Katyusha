<script>
  import {
    closeFullScreenModal,
    exportAllEnvironments,
    environmentsStore
  } from "../stores";

  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      closeFullScreenModal();
    }
  }

  async function onImport() {
    //TODO implement import logic
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
        <use xlink:href="#svg-download" />
      </svg>
      <span class="btn__text">
        Export all sites ({$environmentsStore.length}) to file
      </span>
    </button>
  </div>
</form>
