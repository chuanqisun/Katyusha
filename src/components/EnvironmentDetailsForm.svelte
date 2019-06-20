<script>
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
      if (!environmentForSave.name.length) {
        environmentForSave.name = "Unnamed site";
      }

      if (mode === "create") {
        await addEnvironment(environmentForSave);
      } else {
        await updateEnvironment(environmentForSave);
      }
      closeFullScreenModal();
    }
  }

  async function onRemove() {
    const success = await removeEnvironment(environmentDetails.name);
    if (success) {
      closeFullScreenModal();
    }
  }

  function selectInputContent(e) {
    e.target.select();
  }
</script>

<style>
  .label {
    font-size: 14px;
  }

  .label--field {
    font-weight: bold;
    display: block;
  }

  .form {
    display: grid;
    gap: 1rem;
  }

  .form__field {
    display: grid;
    gap: 0.5rem;
  }

  input[type="text"],
  input[type="url"],
  input[type="password"] {
    height: 2.5rem;
    padding: 0 0.5rem;
    font-size: 16px;
    border: none;
    background-color: #ddd;
  }

  input[type="text"]:focus,
  input[type="url"]:focus,
  input[type="password"]:focus {
    color: white;
    background-color: #222;
  }
</style>

<form class="form" on:submit={onSubmit}>
  <div class="form__field">
    <label class="label label--field" for="name">Name</label>
    <input
      id="name"
      type="text"
      on:focus={selectInputContent}
      bind:value={environmentDetails.name} />
  </div>
  <div class="form__field">
    <label class="label label--field" for="url">URL</label>
    <input
      required
      id="url"
      type="url"
      on:focus={selectInputContent}
      bind:value={environmentDetails.url} />
  </div>
  <div class="form__field">
    <span class="label label--field">Sign in</span>
    <div>
      <input
        id="auth-aad-basic"
        name="auth"
        type="radio"
        value="aad-basic"
        bind:group={environmentDetails.auth} />
      <label class="label label--inline" for="auth-aad-basic">
        AAD username + password
      </label>
    </div>
    <div>
      <input
        id="auth-manual"
        name="auth"
        type="radio"
        value="manual"
        bind:group={environmentDetails.auth} />
      <label class="label label--inline" for="auth-manual">Manual</label>
    </div>
  </div>

  {#if environmentDetails.auth === 'aad-basic'}
    <div class="form__field">
      <label class="label label--field" for="username">Username</label>
      <input
        id="username"
        type="text"
        on:focus={selectInputContent}
        bind:value={environmentDetails.username} />
    </div>
    <div class="form__field">
      <label for="password" class="label label--field">Password</label>
      <input
        id="password"
        type="password"
        on:focus={selectInputContent}
        bind:value={environmentDetails.password} />
    </div>
  {/if}

  <button class="btn btn--icon-text btn--primary" type="submit">
    <svg class="btn__icon">
      <use xlink:href="#svg-save" />
    </svg>
    <span class="btn__text">Save</span>
  </button>

  {#if environmentDetails.mode === 'edit'}
    <button
      class="btn btn--icon-text btn--dangerous"
      on:click={onRemove}
      type="button">
      <svg class="btn__icon">
        <use xlink:href="#svg-trash-2" />
      </svg>
      <span class="btn__text">Remove</span>
    </button>
  {/if}
</form>
