<script>
  // import { signIn, signOut, authStatusStore } from "../stores/auth";
  // import { updateAvailable, noUpdates } from "../helpers/dialogs";
  // import {
  //   supportedVersionsStore,
  //   currentVersionStore
  // } from "../stores/appVersion";

  // const menu = createMenu();

  // function onCheckUpdate() {
  //   const supportedVersions = $supportedVersionsStore;
  //   const latestVersion = supportedVersions[supportedVersions.length - 1];
  //   const currentVersion = $currentVersionStore;

  //   if (currentVersion === latestVersion) {
  //     noUpdates({ currentVersion });
  //   } else {
  //     const downloadUrl = getLatestReleaseUrl();
  //     updateAvailable({ latestVersion, currentVersion, downloadUrl });
  //   }
  // }
</script>

<style>
  footer {
    display: flex;
  }

  .status {
    margin-left: auto;
  }
</style>

<footer>
  <!-- <button on:click={openMenu}>Menu</button>
  <div class="status">{$authStatusStore}</div> -->
  <!-- <button class="btn" on:click={signIn}>Sign in</button>
  <button class="btn" on:click={onCheckUpdate}>Check update</button> -->
</footer>
