<script lang="ts">
  import { safeZones } from "$lib/stores/safeZones";

  export let next: boolean = false;
  export let circleSize: number;
  export let cellSize: number;

  $: leftPosition = next ? $safeZones.next?.left : $safeZones.current.left
  $: topPosition = next ? $safeZones.next?.top : $safeZones.current.top
</script>

<div
  class="safeZone next"
  style:--border-color={next ? "tomato" : "seagreen"}
  style:left={`${leftPosition}px`}
  style:top={`${topPosition}px`}
  style="width: {`${circleSize * cellSize}px`}; height:{`${circleSize * cellSize}px`};"
/>

<style>
  .safeZone {
		--border-color: seagreen;
		position: absolute;
		border: 2px solid var(--border-color);
		border-radius: 100%;
		transition: opacity 200ms ease;
		pointer-events: none;
	}
</style>