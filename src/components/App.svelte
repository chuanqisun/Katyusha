<script>
  import MenuBar from "./MenuBar.svelte";
  import Environments from "./Environments.svelte";
  import FullScreenModal from "./FullScreenModal.svelte";
  import HeroActions from "./HeroActions.svelte";
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
  .app-body {
    padding: 0.5rem;
  }
</style>

<MenuBar />
<div class="app-body">
  {#if !$fullScreenModalStore.component}
    <HeroActions />
    <Environments />
  {/if}
  <FullScreenModal />
</div>
