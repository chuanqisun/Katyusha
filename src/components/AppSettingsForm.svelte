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

  <button class="btn btn--icon-text btn--primary" type="submit">
    <svg class="btn__icon">
      <use xlink:href="#svg-save" />
    </svg>
    <span class="btn__text">Save</span>
  </button>

</form>
