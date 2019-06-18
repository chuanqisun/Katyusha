<script>
  import {
    closeFullScreenModal,
    settingsStore,
    changeEnvironmentsFilePath
  } from "../stores";
  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      closeFullScreenModal();
    }
  }

  async function onChangeEnvironmentsFilePath() {
    changeEnvironmentsFilePath();
  }

  let environmentsFilePath = $settingsStore.environmentsFilePath;
</script>

<style>

</style>

<form class="form" on:submit={onSubmit}>
  <div class="form__field">
    <label class="label label--field" for="environments-profile-path">
      Environments profile
    </label>
    <input
      type="text"
      readonly
      id="environments-profile-path"
      bind:value={environmentsFilePath} />
    <button on:click={onChangeEnvironmentsFilePath}>
      Change profile location
    </button>
  </div>
</form>
