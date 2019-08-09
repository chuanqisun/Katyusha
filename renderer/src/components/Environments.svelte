<script>
  import { environmentsStore } from "../stores/environments";
  import { launch } from "../helpers/launch.js";

  let animatingEnvironmentId,
    animationEndEventListener,
    dragFromIndex,
    dragToIndex;

  function onLaunch(event, environment) {
    animatingEnvironmentId = environment.id;
    launch(environment);
  }

  function onAnimationEnd() {
    animatingEnvironmentId = null;
  }

  function onDragStart(e, index) {
    event.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setDragImage(document.createElement("span"), 0, 0);
    dragFromIndex = index;
    dragToIndex = index;
  }
</script>

<style>

</style>

<ul class="environment-list">
  {#if $environmentsStore}
    {#each $environmentsStore as environment, index (environment.id)}
      <li class="environment-item" class:receiving={dragToIndex === index}>
        <button
          title="Launch {environment.name}"
          class="btn btn--icon-text btn--launch btn--ghost"
          draggable={true}
          class:dragging={dragFromIndex === index}
          on:dragstart={e => onDragStart(e, index)}
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
        </button>
      </li>
    {/each}
  {/if}
</ul>
