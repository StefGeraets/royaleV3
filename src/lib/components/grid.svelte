<script lang="ts">
	import Token from "./token.svelte";

  export let cellSize: number = 32;
  export let gridCells: number = 24;
  let topPosition: number = 0;
  let leftPosition: number = 0;

  $: gridSize = `${(cellSize * gridCells)}px`;
</script>

<div id="grid" style="width: {gridSize}; height: {gridSize}" style:--grid-cell-size={`${cellSize}px`}>
  <Token {cellSize} {gridCells}/>
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
</style>