<script>
  import { getContext } from "svelte";
  import {
    addEnvironment,
    updateEnvironment,
    removeEnvironment,
    closeFullScreenModal,
    environmentDetailsStore
  } from "../stores";

  const environmentDetails = $environmentDetailsStore;

  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      const { mode, ...environmentForSave } = environmentDetails;
      if (mode === "create") {
        await addEnvironment(environmentForSave);
      } else {
        await updateEnvironment(environmentForSave);
      }
      closeFullScreenModal();
    }
  }

  async function onRemove() {
    await removeEnvironment(environmentDetails.name);
    closeFullScreenModal();
  }
</script>

<form on:submit={onSubmit}>
  <div>
    <label for="name">Name</label>
    <input
      required
      id="name"
      type="text"
      bind:value={environmentDetails.name} />
  </div>
  <div>
    <label for="url">URL</label>
    <input required id="url" type="url" bind:value={environmentDetails.url} />
  </div>
  <div>
    Automate authentication
    <input
      id="auth-aad-basic"
      name="auth"
      type="radio"
      value="aad-basic"
      bind:group={environmentDetails.auth} />
    <label for="auth-aad-basic">AAD Username + password</label>
    <br />
    <input
      id="auth-manual"
      name="auth"
      type="radio"
      value="manual"
      bind:group={environmentDetails.auth} />
    <label for="auth-manual">Manual</label>
  </div>

  {#if environmentDetails.auth === 'aad-basic'}
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        bind:value={environmentDetails.username} />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        bind:value={environmentDetails.password} />
    </div>
  {/if}

  {#if environmentDetails.mode === 'edit'}
    <button on:click={onRemove} type="button">Remove</button>
  {/if}
  <button type="submit">Save</button>
</form>
