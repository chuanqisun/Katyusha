<script>
  import { environmentsStore } from "../stores.js";
  import { launch } from "../helpers/launch.js";
</script>

<h1>Launch</h1>
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
