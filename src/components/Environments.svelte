<script>
  import { environmentsStore, fullScreenModalStore } from "../stores";
  import EnvironmentDetailsForm from "./EnvironmentDetailsForm.svelte";
  import { launch } from "../helpers/launch.js";
</script>

<h1>Environments</h1>
<button
  on:click={() => fullScreenModalStore.set({
      component: EnvironmentDetailsForm
    })}>
  Add
</button>
<ul>
  {#if $environmentsStore}
    {#each $environmentsStore as environment}
      <li>
        <button on:click={() => launch(environment)}>
           {environment.name}
        </button>
      </li>
    {/each}
  {/if}
</ul>
