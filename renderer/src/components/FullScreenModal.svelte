<script>
  import { fullScreenModalStore, closeFullScreenModal } from "../stores";
  import { fly } from "svelte/transition";
</script>

<style>
  .btn--back {
    width: 100%;
    margin-bottom: 1rem;
  }
</style>

{#if $fullScreenModalStore.component}
  <div class="transition-container" in:fly={{ x: 200, duration: 250 }}>
    <button
      class="btn btn--icon-text btn--back btn--secondary"
      on:click={() => closeFullScreenModal()}>
      <svg class="btn__icon">
        <use xlink:href="#svg-arrow-left" />
      </svg>
      <span class="btn__text">Back</span>
    </button>
    <svelte:component this={$fullScreenModalStore.component} />
  </div>
{/if}
