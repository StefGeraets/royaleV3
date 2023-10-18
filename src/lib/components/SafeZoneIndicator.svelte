<script lang="ts">
	import { gameRound, gameSettings } from '$lib/stores/gameSettings';
	import { gameState } from '$lib/stores/gameState';
	import { safeZones } from '$lib/stores/safeZones';

	export let next: boolean = false;

	$: leftPosition = next ? $safeZones.next?.left : $safeZones.current?.left;
	$: topPosition = next ? $safeZones.next?.top : $safeZones.current?.top;
	$: ringSize = next ? $gameRound.nextRingSize : $gameRound.currentRingSize;
</script>

<div
	class="safeZone next"
	style:--border-color={next ? 'tomato' : 'seagreen'}
	style:left={`${leftPosition}px`}
	style:top={`${topPosition}px`}
	style="width: {ringSize}px; height:{ringSize}px;"
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
