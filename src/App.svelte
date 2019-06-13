<script>
  import MenuBar from "./components/MenuBar.svelte";
  import { settingsStore, environmentsStore } from "./stores.js";

  $: {
    console.dir($settingsStore);
    console.dir($environmentsStore);
  }
</script>

<style>

</style>

<MenuBar />
<main>Hello svelte</main>
