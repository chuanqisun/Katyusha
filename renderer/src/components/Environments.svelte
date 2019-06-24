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

  let animatingEnvironmentId,
    animationEndEventListener,
    isDragging,
    dragFromIndex,
    dragToIndex;

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

  function onDragStart(e, index) {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setDragImage(document.createElement("span"), 0, 0);
    dragFromIndex = index;
    dragToIndex = index;
    isDragging = true;
  }

  function onDragEnd() {
    isDragging = false;
    dragFromIndex = null;
    dragToIndex = null;
  }

  function onDragEnter(e, index) {
    event.preventDefault();
    dragToIndex = index;
  }

  function getReorderedEnvironments(
    isDragging,
    fromIndex,
    toIndex,
    originalEnvironments
  ) {
    if (!isDragging) {
      return originalEnvironments;
    } else {
      const newEnvironments = [...originalEnvironments];
      const [fromEnvironment] = newEnvironments.splice(fromIndex, 1);
      newEnvironments.splice(toIndex, 0, fromEnvironment);
      return newEnvironments;
    }
  }

  $: reorderedEnviroments = getReorderedEnvironments(
    isDragging,
    dragFromIndex,
    dragToIndex,
    $environmentsStore
  );
</script>

<style>
  .btn--launch {
    position: relative;
  }

  .btn--launch.dragging {
    color: inherit;
    background-color: transparent;
  }

  .btn--launch .btn__icon {
    transition: all 250ms;
  }

  .btn__icon--active {
    color: var(--launch-icon-color);
    --fill-color: transparent;
  }

  .btn__icon--active.animating {
    --fill-color: var(--launch-icon-color);
    animation: scaleUpAndDown 250ms;
  }

  :global(.btn--launch:focus.focus-visible .btn__icon--rest),
  .btn--launch:not(.dragging):hover .btn__icon--rest {
    opacity: 0;
  }

  .btn--launch .btn__icon--active {
    transform: translateX(-50%);
    position: absolute;
    left: 1rem;
    opacity: 0;
  }

  :global(.btn--launch:focus.focus-visible .btn__icon--active),
  .btn--launch:not(.dragging):hover .btn__icon--active {
    transform: translateX(0);
    opacity: 1;
  }

  .btn--edit {
    opacity: 0;
  }

  .btn--edit:focus {
    opacity: 1;
  }

  .environment-item:hover .btn--edit:not(.dragging) {
    opacity: 1;
  }

  .environment-list {
    list-style: none;
    margin: 1rem 0 0 0;
    padding: 0;
    position: relative;
    display: grid;
  }

  .environment-item {
    display: grid;
    grid-template-columns: minmax(10em, 1fr) auto;
    gap: 0.5rem;
  }

  .environment-item.receiving .btn {
    color: var(--dragging-element-color);
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
    {#each $environmentsStore as environment, index (environment.id)}
      <li
        class="environment-item"
        class:receiving={dragToIndex === index}
        on:dragenter={e => onDragEnter(e, index)}
        on:dragover={e => e.preventDefault()}>
        <button
          title="Launch {environment.name}"
          class="btn btn--icon-text btn--launch btn--ghost"
          draggable={true}
          class:dragging={dragFromIndex === index}
          on:dragstart={e => onDragStart(e, index)}
          on:dragend={onDragEnd}
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
          <span class="btn__text">{reorderedEnviroments[index].name} </span>
        </button>
        <button
          title="Edit site"
          class:dragging={dragFromIndex === index}
          class="btn btn--icon-only btn--edit btn--square btn--ghost"
          on:click={() => onOpenEditEnvironmentFormByEnvironmentId(environment.id)}>
          <svg class="btn__icon">
            <use xlink:href="#svg-sliders" />
          </svg>
        </button>
      </li>
    {/each}
  {/if}
</ul>
