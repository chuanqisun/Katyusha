<script>
  import {
    openFullScreenModal,
    hydrateEnvironmentDetailsFormToCreate,
    updateServiceStore
  } from "../stores";

  import EnvironmentDetailsForm from "./EnvironmentDetailsForm.svelte";
  import AppSettingsForm from "./AppSettingsForm.svelte";

  function onOpenAddEnvironmentForm() {
    hydrateEnvironmentDetailsFormToCreate();

    openFullScreenModal(EnvironmentDetailsForm);
  }

  function onOpenAppSettingsForm() {
    openFullScreenModal(AppSettingsForm);
  }
</script>

<style>
  .hero-actions {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
  }

  .btn__settings {
    position: relative;
  }

  .btn__update-indicator {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--update-prompt-color);
  }
</style>

<div class="hero-actions">
  <button
    class="btn btn--icon-text btn--secondary"
    on:click={onOpenAddEnvironmentForm}>
    <svg class="btn__icon">
      <use xlink:href="#svg-plus" />
    </svg>
    <span class="btn__text">Add a site</span>
  </button>
  <button
    title={$updateServiceStore.needUpdate ? '[Updates available] App settings' : 'App settings'}
    on:click={onOpenAppSettingsForm}
    class="btn btn__settings btn--icon-only btn--square btn--ghost">
    <svg class="btn__icon">
      <use xlink:href="#svg-settings" />
    </svg>
    {#if $updateServiceStore.needUpdate}
      <div class="btn__update-indicator" />
    {/if}
  </button>
</div>
