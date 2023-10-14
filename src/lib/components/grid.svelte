<script lang="ts">
	import Token from './token.svelte';
	import { safeZones } from '$lib/stores/safeZones';

	export let cellSize: number = 32;
	export let gridCells: number = 24;
	export let circleSize: number = 20;
	let ringOpacity: number = 0;
	let ringLeftPosition: number = 0;
	let ringTopPosition: number = 0;

	$: gridSize = `${cellSize * gridCells}px`;

	const showRing = () => {
		ringOpacity = 1;
	};
	const hideRing = () => {
		ringOpacity = 0;
	};
	const moveRing = (e: MouseEvent) => {
		if (!e.target) return;
		const { target } = e;
		ringLeftPosition = e.clientX - (target as HTMLElement).offsetLeft - (circleSize * cellSize) / 2;
		ringTopPosition = e.clientY - (target as HTMLElement).offsetTop - (circleSize * cellSize) / 2;
	};
	const placeRing = (e: MouseEvent) => {
		const { currentTarget } = e;
		const clickPos = (currentTarget as HTMLElement).getBoundingClientRect();
		const left = e.clientX - clickPos.left;
		const top = e.clientY - clickPos.top;
		safeZones.setNext({
			left: left - (circleSize * cellSize) / 2,
			top: top - (circleSize * cellSize) / 2
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="grid"
	style="width: {gridSize}; height: {gridSize}"
	style:--grid-cell-size={`${cellSize}px`}
	on:mouseenter={showRing}
	on:mousemove={moveRing}
	on:mouseleave={hideRing}
	on:click={placeRing}
>
	<Token {cellSize} {gridCells} />
	<div
		class="safeZone"
		style:left={`${$safeZones.current.left}px`}
		style:top={`${$safeZones.current.top}px`}
		style="width: {`${circleSize * cellSize}px`}; height:{`${circleSize * cellSize}px`};"
	/>
	<div
		class="mouse-ring"
		style:--opacity={ringOpacity}
		style:left={`${ringLeftPosition}px`}
		style:top={`${ringTopPosition}px`}
		style="width: {`${circleSize * cellSize}px`}; height:{`${circleSize * cellSize}px`};"
	/>
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

	.mouse-ring {
		--opacity: 0;
		opacity: var(--opacity);
		position: absolute;
		border: 2px solid seagreen;
		border-radius: 100%;
		transition: opacity 200ms ease;
		pointer-events: none;
	}
	.safeZone {
		position: absolute;
		border: 2px solid seagreen;
		border-radius: 100%;
		transition: opacity 200ms ease;
		pointer-events: none;
	}
</style>
