<script>
  import {
    environmentsStore,
    fullScreenModalStore,
    environmentDetailsStore
  } from "../stores";
  import EnvironmentDetailsForm from "./EnvironmentDetailsForm.svelte";
  import { launch } from "../helpers/launch.js";

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

  function onOpenEditEnvironmentForm(environment) {
    environmentDetailsStore.set({ ...environment, mode: "edit" });

    fullScreenModalStore.set({
      component: EnvironmentDetailsForm
    });
  }
</script>

<h1>Environments</h1>
<button on:click={onOpenAddEnvironmentForm}>Add</button>
<ul>
  {#if $environmentsStore}
    {#each $environmentsStore as environment}
      <li>
        <button on:click={() => launch(environment)}>
           {environment.name}
        </button>
        <button on:click={() => onOpenEditEnvironmentForm(environment)}>
          edit
        </button>
      </li>
    {/each}
  {/if}
</ul>
