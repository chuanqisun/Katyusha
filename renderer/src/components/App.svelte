<script>
  import MenuBar from "./MenuBar.svelte";
  import Environments from "./Environments.svelte";
  import Footer from "./Footer.svelte";

  import { initializeAppVersionStore } from "../stores/appVersion";
  import { checkSignInStatus } from "../stores/auth";

  checkSignInStatus();
  initializeAppVersionStore();
</script>

<style>

</style>

<MenuBar />
<div class="app-body">
  <Environments />
</div>
<Footer />
