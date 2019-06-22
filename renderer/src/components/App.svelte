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
  import { fly } from "svelte/transition";
</script>

<style>
  .app-body {
    padding: 1.5rem 1rem 1rem 1rem;
    overflow-y: auto;
    overflow-x: hidden; /* prevent scroll bar during fly-in transition */
  }
</style>

<MenuBar />
<div class="app-body">
  {#if !$fullScreenModalStore.component}
    <div in:fly={{ x: -200, duration: 250 }}>
      <HeroActions />
      <Environments />
    </div>
  {/if}
  <FullScreenModal />
</div>
