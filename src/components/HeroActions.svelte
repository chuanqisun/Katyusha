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

<button
  class="btn btn--icon-text btn--add-environment btn--secondary"
  on:click={onOpenAddEnvironmentForm}>
  <svg class="btn__icon">
    <use xlink:href="#svg-plus" />
  </svg>
  <span class="btn__text">Add environment</span>
</button>
<button on:click={onOpenAppSettingsForm} class="btn btn--icon-only">
  <svg class="btn__icon">
    <use xlink:href="#svg-settings" />
  </svg>
</button>
