<script>
  import {
    openFullScreenModal,
    hydrateEnvironmentDetailsFormToCreate
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
    on:click={onOpenAppSettingsForm}
    class="btn btn--icon-only btn--square btn--ghost">
    <svg class="btn__icon">
      <title>App settings</title>
      <use xlink:href="#svg-settings" />
    </svg>
  </button>
</div>
