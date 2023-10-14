<script lang="ts">
  export let ringOpacity: number;
  export let ringLeftPosition: number;
  export let ringTopPosition: number;
  export let circleSize: number;
  export let cellSize: number;

</script>

<div
class="mouse-ring"
style:--opacity={ringOpacity}
style:left={`${ringLeftPosition}px`}
style:top={`${ringTopPosition}px`}
style="width: {`${circleSize * cellSize}px`}; height:{`${circleSize * cellSize}px`};"
/>

<style>
  .mouse-ring {
		--opacity: 0;
		opacity: var(--opacity);
		position: absolute;
		border: 2px solid gray;
		border-radius: 100%;
		transition: opacity 200ms ease;
		pointer-events: none;
	}
</style>