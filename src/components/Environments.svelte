<script>
  import {
    environmentsStore,
    fullScreenModalStore,
    environmentDetailsStore,
    openFullScreenModal,
    hydrateEnvironmentDetailsFormToCreate,
    hydrateEnvironmentDetailsFormToEditByEnvironmentId
  } from "../stores";
  import EnvironmentDetailsForm from "./EnvironmentDetailsForm.svelte";
  import { launch } from "../helpers/launch.js";

  let animatingEnvironmentId, animationEndEventListener;

  function onOpenAddEnvironmentForm() {
    hydrateEnvironmentDetailsFormToCreate();
    openFullScreenModal(EnvironmentDetailsForm);
  }

  function onOpenEditEnvironmentFormByEnvironmentId(id) {
    hydrateEnvironmentDetailsFormToEditByEnvironmentId(id);
    openFullScreenModal(EnvironmentDetailsForm);
  }

  function onLaunch(event, environment) {
    animatingEnvironmentId = environment.id;
    launch(environment);
  }

  function onAnimationEnd() {
    animatingEnvironmentId = null;
  }
</script>

<style>
  .btn--launch {
    position: relative;
  }

  .btn--launch .btn__icon {
    transition: all 250ms;
  }

  .btn__icon--active {
    --fill-color: transparent;
  }

  .btn__icon--active.animating {
    --fill-color: white;
    animation: scaleUpAndDown 250ms;
  }

  :global(.btn--launch:focus.focus-visible .btn__icon--rest),
  .btn--launch:hover .btn__icon--rest {
    opacity: 0;
  }

  .btn--launch .btn__icon--active {
    transform: translateX(-50%);
    position: absolute;
    left: 1rem;
    opacity: 0;
  }

  :global(.btn--launch:focus.focus-visible .btn__icon--active),
  .btn--launch:hover .btn__icon--active {
    transform: translateX(0);
    opacity: 1;
  }

  .btn--edit {
    opacity: 0;
  }

  .btn--edit:focus {
    opacity: 1;
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
    gap: 0.5rem;
  }

  @keyframes scaleUpAndDown {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<ul class="environment-list">
  {#if $environmentsStore}
    {#each $environmentsStore as environment}
      <li class="environment-item">
        <button
          class="btn btn--icon-text btn--launch btn--ghost"
          on:click={event => onLaunch(event, environment)}>
          <svg
            on:animationend={onAnimationEnd}
            class="btn__icon btn__icon--active"
            class:animating={environment.id === animatingEnvironmentId}>
            <use xlink:href="#svg-play" />
          </svg>
          <svg class="btn__icon btn__icon--rest">
            <use xlink:href="#svg-dot" />
          </svg>
          <span class="btn__text">{environment.name}</span>
        </button>
        <button
          class="btn btn--icon-only btn--edit btn--square btn--ghost"
          on:click={() => onOpenEditEnvironmentFormByEnvironmentId(environment.id)}>
          <svg class="btn__icon">
            <use xlink:href="#svg-edit" />
          </svg>
        </button>
      </li>
    {/each}
  {/if}
</ul>
