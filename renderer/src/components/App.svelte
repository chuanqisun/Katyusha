<script>
  import MenuBar from "./MenuBar.svelte";
  import Environments from "./Environments.svelte";

  import { initializeAppVersionStore } from "../stores/appVersion";
  import { checkSignInStatus, signIn, authStatusStore } from "../stores/auth";
  import { loadEnvironments, environmentsStore } from "../stores/environments";

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

  .pre-sign-in {
    display: flex;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--sign-in-btn-text-color);
    background-color: var(--sign-in-btn-background-color);

    padding: 0.75rem 4rem;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  }

  .btn:hover {
    color: var(--sign-in-btn-text-color-hover);
    background-color: var(--sign-in-btn-background-color-hover);
  }
</style>

<MenuBar />
<div class="app-body">
  {#if $environmentsStore === null}
    <div class="pre-sign-in">
      {#if $authStatusStore === 'checking'}
        <div>checking sign-in status...</div>
      {/if}
      {#if $authStatusStore === 'signing-in'}
        <div>signing in...</div>
      {/if}
      {#if $authStatusStore === 'signed-out'}
        <button class="btn" on:click={onManualSignIn}>Sign in</button>
      {/if}
    </div>
  {/if}
  {#if $environmentsStore !== null}
    <Environments />
  {/if}
</div>
