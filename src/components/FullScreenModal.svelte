<script>
  import { fullScreenModalStore, closeFullScreenModal } from "../stores";
</script>

{#if $fullScreenModalStore.component}
  <button on:click={() => closeFullScreenModal()}>Back</button>
  <svelte:component this={$fullScreenModalStore.component} />
{/if}
