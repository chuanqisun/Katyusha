<script>
  import { closeFullScreenModal } from "../stores";
  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      closeFullScreenModal();
    }
  }
</script>

<style>

</style>

<form class="form" on:submit={onSubmit}>
  <div class="form__field">
    <label class="label label--field" for="environments-profile-path">
      Environments profile
    </label>
    <input
      required
      id="environments-profile-path"
      type="environments-profile-path" />
  </div>

  <button class="btn btn--icon-text btn--primary" type="submit">
    <svg class="btn__icon">
      <use xlink:href="#svg-save" />
    </svg>
    <span class="btn__text">Save</span>
  </button>

</form>
