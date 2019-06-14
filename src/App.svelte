<script>
  import MenuBar from "./components/MenuBar.svelte";
  import Environments from "./components/Environments.svelte";
  import { settingsStore, environmentsStore } from "./stores.js";

  $: {
    console.dir($settingsStore);
    console.dir($environmentsStore);
  }
</script>

<style>

</style>

<MenuBar />
<Environments />
