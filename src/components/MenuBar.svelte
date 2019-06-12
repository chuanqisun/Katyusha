<script>
  const { ipcRenderer } = require("electron");
</script>

<style>
  :root {
    --menu-bar-height: 1.875rem;
    --menu-bar-background-color: #323130;
    --menu-bar-background-color-hover: #505050;
    --menu-bar-text-color: #cccccc;
    --menu-bar-text-color-strong: white;
    --window-action-width: 2.875rem;
    --window-action-destructive-background: #d0062a;
  }

  .app-menu {
    height: var(--menu-bar-height);

    -webkit-app-region: drag;
    display: flex;
    justify-content: space-between;
    background-color: var(--menu-bar-background-color);
    color: var(--menu-bar-text-color);
  }

  .app-menu__window-actions {
    display: flex; /* prevent button-to-button gaps*/
  }

  .app-menu__window-action {
    color: var(--menu-bar-text-color);
    background-color: var(--menu-bar-background-color);
    border: none;
    width: var(--window-action-width);
    height: 100%;
  }

  .app-menu__window-action:hover {
    color: var(--menu-bar-text-color-strong);
    background-color: var(--menu-bar-background-color-hover);
  }

  .app-menu__window-action--destructive:hover {
    background-color: var(--window-action-destructive-background);
  }
</style>

<header class="app-menu">
  <div class="app-menu__title">Katyusha</div>
  <div class="app-menu__window-actions">
    <button
      class="app-menu__window-action"
      on:click={() => ipcRenderer.send('tryMinimize')}>
      <svg class="icon">
        <use xlink:href="#svg-minimize" />
      </svg>
    </button>
    <button
      class="app-menu__window-action app-menu__window-action--destructive"
      on:click={() => ipcRenderer.send('tryClose')}>
      <svg class="icon">
        <use xlink:href="#svg-close" />
      </svg>
    </button>
  </div>
</header>
