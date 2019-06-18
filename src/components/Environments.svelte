<script>
  import {
    environmentsStore,
    fullScreenModalStore,
    environmentDetailsStore
  } from "../stores";
  import EnvironmentDetailsForm from "./EnvironmentDetailsForm.svelte";
  import { launch } from "../helpers/launch.js";

  function onOpenAddEnvironmentForm() {
    environmentDetailsStore.set({
      mode: "create",
      name: "New environment",
      url: "",
      username: "",
      password: "",
      auth: "aad-basic"
    });

    fullScreenModalStore.set({
      component: EnvironmentDetailsForm
    });
  }

  function onOpenEditEnvironmentForm(environment) {
    environmentDetailsStore.set({ ...environment, mode: "edit" });

    fullScreenModalStore.set({
      component: EnvironmentDetailsForm
    });
  }
</script>

<style>
  .btn--launch .btn__icon {
    transition: all 250ms;
  }

  .btn--launch:hover .btn__icon--rest {
    opacity: 0;
  }

  .btn--launch .btn__icon--active {
    transform: translateX(-50%);
    position: absolute;
    left: 2rem;
    opacity: 0;
  }

  .btn--launch:hover .btn__icon--active {
    transform: translateX(0);
    opacity: 1;
  }

  .btn--edit {
    opacity: 0;
    padding: 0 0.5rem;
  }

  .btn--add-environment {
    width: 100%;
    justify-content: flex-start;
  }

  .environment-item:hover .btn--edit {
    opacity: 1;
  }

  .environment-list {
    list-style: none;
    margin: 1rem 0 0 0;
    padding: 0;
  }

  .environment-item {
    display: grid;
    grid-template-columns: minmax(10em, 1fr) auto;
    justify-items: stretch;
  }
</style>

<!-- <button
  class="btn btn--icon-text btn--add-environment btn--secondary"
  on:click={onOpenAddEnvironmentForm}>
  <svg class="btn__icon">
    <use xlink:href="#svg-plus" />
  </svg>
  <span class="btn__text">Add environment</span>
</button> -->
<ul class="environment-list">
  {#if $environmentsStore}
    {#each $environmentsStore as environment}
      <li class="environment-item">
        <button
          class="btn btn--icon-text btn--launch btn--square btn--ghost"
          on:click={() => launch(environment)}>
          <svg class="btn__icon btn__icon--active">
            <use xlink:href="#svg-play" />
          </svg>
          <svg class="btn__icon btn__icon--rest">
            <use xlink:href="#svg-dot" />
          </svg>
          <span class="btn__text">{environment.name}</span>
        </button>
        <button
          class="btn btn--icon-only btn--edit btn--square btn--ghost"
          on:click={() => onOpenEditEnvironmentForm(environment)}>
          <svg class="btn__icon">
            <use xlink:href="#svg-edit" />
          </svg>
        </button>
      </li>
    {/each}
  {/if}
</ul>
