<script>
  import MenuBar from "./MenuBar.svelte";
  import Environments from "./Environments.svelte";

  import { initializeAppVersionStore } from "../stores/appVersion";
  import { checkSignInStatus, signIn, authStatusStore } from "../stores/auth";
  import { loadEnvironments } from "../stores/environments";

  const { globalShortcut } = require("electron").remote;

  const isSignedIn = checkSignInStatus();
  if (isSignedIn) {
    loadEnvironments();
  }
  initializeAppVersionStore();

  async function onManualSignIn() {
    const signInSuccess = await signIn();
    if (signInSuccess) {
      loadEnvironments();
    }
  }
</script>

<style>
  .app-body {
    overflow: auto;
  }
</style>

<MenuBar />
<div class="app-body">
  {#if $authStatusStore === 'checking'}
    <div>checking sign-in status...</div>
  {/if}
  {#if $authStatusStore === 'signing-in'}
    <div>signing in...</div>
  {/if}
  {#if $authStatusStore === 'signed-out'}
    <button on:click={onManualSignIn}>Sign in</button>
  {/if}
  <Environments />
</div>
