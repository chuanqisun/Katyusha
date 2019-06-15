<script>
  import MenuBar from "./MenuBar.svelte";
  import Environments from "./Environments.svelte";
  import FullScreenModal from "./FullScreenModal.svelte";
  import {
    settingsStore,
    environmentsStore,
    fullScreenModalStore
  } from "../stores";

  $: {
    console.dir($settingsStore);
    console.dir($environmentsStore);
  }
</script>

<style>

</style>

<MenuBar />
{#if !$fullScreenModalStore.component}
  <Environments />
{/if}
<FullScreenModal />
