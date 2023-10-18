<script lang="ts">
	import { gameRound } from '$lib/stores/gameSettings';
	export let ringOpacity: number;
	export let ringLeftPosition: number;
	export let ringTopPosition: number;

	$: ringSize = $gameRound.nextRingSize;
</script>

<div
	class="mouse-ring"
	style:--opacity={ringOpacity}
	style:left={`${ringLeftPosition}px`}
	style:top={`${ringTopPosition}px`}
	style="width: {`${ringSize}px`}; height:{`${ringSize}px`};"
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
