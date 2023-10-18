<script lang="ts">
	import { gameRound, gameSettings } from '$lib/stores/gameSettings';
	import { safeZones } from '$lib/stores/safeZones';
	import Token from './Token.svelte';
	import MouseRing from './MouseRing.svelte';
	import SafeZoneIndicator from './SafeZoneIndicator.svelte';

	let ringOpacity: number = 0;
	let ringLeftPosition: number = 0;
	let ringTopPosition: number = 0;

	$: gridSize = `${$gameSettings.cellSize * $gameSettings.gridCells}px`;
	$: ringSize = $gameRound.nextRingSize;

	const showRing = () => {
		ringOpacity = 1;
	};
	const hideRing = () => {
		ringOpacity = 0;
	};
	const moveRing = (e: MouseEvent) => {
		if (!e.target) return;
		const { target } = e;
		ringLeftPosition = e.clientX - (target as HTMLElement).offsetLeft - ringSize / 2;
		ringTopPosition = e.clientY - (target as HTMLElement).offsetTop - ringSize / 2;
	};
	const placeRing = (e: MouseEvent) => {
		const { currentTarget } = e;
		const clickPos = (currentTarget as HTMLElement).getBoundingClientRect();
		const left = e.clientX - clickPos.left;
		const top = e.clientY - clickPos.top;
		safeZones.setNext({
			left: left - (left % $gameSettings.cellSize) + $gameSettings.cellSize / 2 - ringSize / 2,
			top: top - (top % $gameSettings.cellSize) + $gameSettings.cellSize / 2 - ringSize / 2
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="grid"
	style="width: {gridSize}; height: {gridSize}"
	style:--grid-cell-size={`${$gameSettings.cellSize}px`}
	on:mouseenter={showRing}
	on:mousemove={moveRing}
	on:mouseleave={hideRing}
	on:click={placeRing}
>
	<Token />

	{#if $safeZones.next}
		<SafeZoneIndicator next />
	{/if}
	{#if $safeZones.current}
		<SafeZoneIndicator />
	{/if}

	<MouseRing {ringOpacity} {ringLeftPosition} {ringTopPosition} />
</div>

<style lang="scss">
	:root {
		--grid-cell-size: 32px;
	}

	.grid {
		position: relative;
		display: block;
		background: transparent;
		background-image: linear-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px),
			linear-gradient(90deg, rgba(150, 150, 150, 0.25) 1px, transparent 1px);
		background-size: var(--grid-cell-size) var(--grid-cell-size);
		background-position: -1px -1px;
		border: 1px solid rgba(229, 231, 235);
	}
</style>
