<script lang="ts">
  export let cellSize: number = 32;
  export let gridCells: number = 24;
  let topPosition: number = 0;
  let leftPosition: number = 0;

  $: gridSize = `${(cellSize * gridCells)}px`;

  const navigate = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      if (topPosition <= 0) return;
      topPosition -= cellSize;
    }
    if (event.key === "ArrowDown") {
      if (topPosition >= (cellSize * (gridCells - 1))) return;
      topPosition += cellSize;
    }
    if (event.key === "ArrowLeft") {
      if (leftPosition <= 0) return;
      leftPosition -= cellSize;
    }
    if (event.key === "ArrowRight") {
      if (leftPosition >= (cellSize * (gridCells - 1))) return;
      leftPosition += cellSize;
    }
  }
</script>

<svelte:window on:keydown|preventDefault={navigate} />

<div id="grid" style="width: {gridSize}; height: {gridSize}" style:--grid-cell-size={`${cellSize}px`}>
  <div class="team" style="left: {leftPosition - 0.5}px; top: {topPosition - 0.5}px; width: {cellSize}px; height: {cellSize}px">O</div>
</div>

<style lang="scss">
  :root {
    --grid-cell-size: 32px;
  }

  #grid {
    position: relative;
    display: block;
    background: transparent;
    background-image: 
      linear-gradient(rgba(150, 150, 150, .25) 1px, transparent 1px), 
      linear-gradient(90deg, rgba(150, 150, 150, .25) 1px, transparent 1px);
    background-size: var(--grid-cell-size) var(--grid-cell-size);
    background-position: -1px -1px;
    border: 1px solid rgba(229, 231, 235);
  }

  .team {
    display: block;
    position: absolute;
    background: tomato;
  }
</style>