<script>
  import { fullScreenModalStore, closeFullScreenModal } from "../stores";
</script>

<style>
  .btn--back {
    width: 100%;
    margin-bottom: 1rem;
  }
</style>

{#if $fullScreenModalStore.component}
  <button
    class="btn btn--icon-text btn--back btn--secondary"
    on:click={() => closeFullScreenModal()}>
    <svg class="btn__icon">
      <use xlink:href="#svg-arrow-left" />
    </svg>
    <span class="btn__text">Back</span>
  </button>
  <svelte:component this={$fullScreenModalStore.component} />
{/if}
