<script>
  import { closeFullScreenModal } from "../stores";

  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      closeFullScreenModal();
    }
  }

  async function onImport() {}
  async function onExport() {}
</script>

<style>

</style>

<form class="form" on:submit={onSubmit}>
  <div class="form__field">
    <button on:click={onImport}>Import environments</button>
    <button on:click={onExport}>Export environments</button>
  </div>
</form>
