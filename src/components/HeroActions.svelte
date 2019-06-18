<script>
  import { fullScreenModalStore, environmentDetailsStore } from "../stores";
  import EnvironmentDetailsForm from "./EnvironmentDetailsForm.svelte";
  import AppSettingsForm from "./AppSettingsForm.svelte";

  function onOpenAddEnvironmentForm() {
    environmentDetailsStore.set({
      mode: "create",
      name: "New environment",
      url: "",
      username: "",
      password: "",
      auth: "aad-basic"
    });

    fullScreenModalStore.set({
      component: EnvironmentDetailsForm
    });
  }

  function onOpenAppSettingsForm() {
    fullScreenModalStore.set({
      component: AppSettingsForm
    });
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
    <span class="btn__text">Add environment</span>
  </button>
  <button
    on:click={onOpenAppSettingsForm}
    class="btn btn--icon-only btn--square btn--ghost">
    <svg class="btn__icon">
      <use xlink:href="#svg-settings" />
    </svg>
  </button>
</div>
