<script>
  const { ipcRenderer } = require("electron");
</script>

<style>
  :root {
    --menu-bar-height: 1.875rem;
    --window-action-width: 2.875rem;
  }

  .app-menu {
    height: var(--menu-bar-height);

    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--menu-bar-background-color);
    color: var(--menu-bar-text-color);

    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }

  .app-menu__action {
    color: var(--menu-bar-text-color);
    background-color: var(--menu-bar-background-color);
    border: none;
    outline-offset: -2px;
  }

  .app-menu__action:hover {
    color: var(--menu-bar-text-color-strong);
    background-color: var(--menu-bar-background-color-hover);
  }

  .app-menu__title {
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: var(--logo-color);
    font-weight: 700;
    height: 100%;
  }

  .app-menu__window-actions {
    display: flex; /* prevent button-to-button gaps*/
    height: 100%;
  }

  .app-menu__window-action {
    width: var(--window-action-width);
    height: 100%;
  }

  .app-menu__window-action--close:hover {
    background-color: var(--menu-bar-destructive-background);
  }

  .icon {
    width: var(--icon-size-16);
    height: var(--icon-size-16);
  }

  .app-menu__logo {
    width: 0.5625rem; /*9px*/
    height: 1rem; /*16px*/
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    transform: translateY(1px);
  }
</style>

<header class="app-menu">
  <div class="app-menu__title">
    <svg class="app-menu__logo">
      <use xlink:href="#svg-strike" />
    </svg>
    Katyusha
  </div>
  <div class="app-menu__window-actions">
    <button
      class="app-menu__action app-menu__window-action"
      on:click={() => ipcRenderer.send('tryMinimize')}>
      <svg class="icon">
        <use xlink:href="#svg-minimize" />
      </svg>
    </button>
    <button
      class="app-menu__action app-menu__window-action
      app-menu__window-action--close"
      on:click={() => ipcRenderer.send('tryClose')}>
      <svg class="icon">
        <use xlink:href="#svg-close" />
      </svg>
    </button>
  </div>
</header>
