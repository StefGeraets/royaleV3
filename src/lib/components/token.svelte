<script lang="ts">
  export let cellSize: number;
  export let gridCells: number;
  let topPosition: number = 0;
  let leftPosition: number = 0;

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

<div class="token" style="left: {leftPosition - 0.5}px; top: {topPosition - 0.5}px; width: {cellSize}px; height: {cellSize}px">O</div>

<style lang="scss">
  .token {
    display: block;
    position: absolute;
    background: tomato;
  }
</style>