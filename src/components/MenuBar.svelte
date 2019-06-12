<script>
  const { ipcRenderer } = require("electron");
</script>

<style>

</style>

<header class="app-menu">
  <div class="app-menu__title">
    <button>Katyusha</button>
  </div>
  <div class="app-menu__window-actions">
    <button
      class="app-menu__window-action-button"
      on:click={() => ipcRenderer.send('tryMinimize')}>
      <svg width="0.6rem" height="0.6rem">
        <use xlink:href="#svg-minimize" />
      </svg>
    </button>
    <button
      class="app-menu__window-action-button"
      on:click={() => ipcRenderer.send('tryClose')}>
      <svg width="0.6rem" height="0.6rem">
        <use xlink:href="#svg-close" />
      </svg>
    </button>
  </div>
</header>
