<script>
  import { environmentsStore } from "../stores/environments";
  import { launch } from "../helpers/launch.js";

  let animatingEnvironmentId;

  function onClickEnvironment(event, environment) {
    animatingEnvironmentId = environment.id;
    launch(environment);
  }

  function onAnimationEnd() {
    animatingEnvironmentId = null;
  }
</script>

<style>
  .environment-list {
    padding: 16px;
    list-style: none;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    gap: 16px;
  }

  .launch-button {
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--launch-btn-text-color);
    background-color: var(--launch-btn-background-color);
    position: relative;
    overflow: hidden;
    text-align: left;
    padding: 0.75rem 1rem;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  }

  .launch-button:hover {
    color: var(--launch-btn-text-color-hover);
    background-color: var(--launch-btn-background-color-hover);
  }

  .launch-indicator {
    height: 2px;
    background-color: var(--launch-btn-indicator-color);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    will-change: transform, opacity;
    transform: translateX(-100%);
  }

  .launch-indicator.animating {
    animation: launch 500ms;
    animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    animation-fill-mode: backwards;
  }

  @keyframes launch {
    0% {
      transform: translateX(-100%);
      opacity: 1;
    }
    40% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 0;
    }
  }
</style>

<div class="environment-list">
  {#if $environmentsStore}
    {#each $environmentsStore as environment}
      <button
        class="launch-button"
        on:click={event => onClickEnvironment(event, environment)}>
        {environment.name}
        <div
          class="launch-indicator"
          on:animationend={onAnimationEnd}
          class:animating={environment.id === animatingEnvironmentId} />
      </button>
    {/each}
  {/if}
</div>
