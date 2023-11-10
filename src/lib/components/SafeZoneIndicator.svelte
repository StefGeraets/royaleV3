<script lang="ts">
	import { gameRound } from '$lib/stores/gameSettings';
	import { safeZones } from '$lib/stores/safeZones';

	export let next: boolean = false;

	$: leftPosition = next ? $safeZones.next?.left : $safeZones.current?.left;
	$: topPosition = next ? $safeZones.next?.top : $safeZones.current?.top;
	$: ringSize = next ? $gameRound.nextRingSize : $gameRound.currentRingSize;
</script>

<div
	class="safeZone"
	class:next
	style:--border-color={next ? 'tomato' : 'gold'}
	style:left={`${leftPosition}px`}
	style:top={`${topPosition}px`}
	style="width: {ringSize}px; height:{ringSize}px;"
/>

<style>
	.safeZone {
		--border-color: seagreen;
		position: absolute;
		border: 1px solid var(--border-color);
		border-radius: 100%;
		transition: opacity 200ms ease;
		pointer-events: none;

		&.next {
			border-style: dashed;
			border-width: 2px;
		}
	}
</style>
