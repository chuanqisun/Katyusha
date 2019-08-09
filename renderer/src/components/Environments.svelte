<script>
  import { environmentsStore } from "../stores/environments";
  import { launch } from "../helpers/launch.js";
</script>

<style>
  .environment-list {
    padding: 16px;
    list-style: none;
    margin: 0;
    display: grid;
    grid-auto-rows: auto;
    gap: 16px;
  }

  .launch-button {
    height: 48px;
    color: white;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>

<div class="environment-list">
  {#if $environmentsStore}
    {#each $environmentsStore as environment}
      <button class="launch-button" on:click={() => launch(environment)}>
        {environment.name}
      </button>
    {/each}
  {/if}
</div>
