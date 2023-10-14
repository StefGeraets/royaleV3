<script lang="ts">
	import { gameSettings } from '$lib/stores/gameSettings';
	let topPosition: number = 0;
	let leftPosition: number = 0;

	const navigateToken = (event: KeyboardEvent): void => {
		if (event.key === 'ArrowUp') {
			if (topPosition <= 0) return;
			topPosition -= $gameSettings.cellSize;
		}
		if (event.key === 'ArrowDown') {
			if (topPosition >= $gameSettings.cellSize * ($gameSettings.gridCells - 1)) return;
			topPosition += $gameSettings.cellSize;
		}
		if (event.key === 'ArrowLeft') {
			if (leftPosition <= 0) return;
			leftPosition -= $gameSettings.cellSize;
		}
		if (event.key === 'ArrowRight') {
			if (leftPosition >= $gameSettings.cellSize * ($gameSettings.gridCells - 1)) return;
			leftPosition += $gameSettings.cellSize;
		}
	};

	$: tokenWidth = $gameSettings.cellSize - $gameSettings.cellSize / 4;
</script>

<svelte:window on:keydown|preventDefault={navigateToken} />

<div
	class="token"
	style="
		left: {leftPosition - 0.5 + $gameSettings.cellSize / 4 / 2}px; 
		top: {topPosition - 0.5 + $gameSettings.cellSize / 4 / 2}px; 
		width: {tokenWidth}px; 
		height: {tokenWidth}px"
></div>

<style lang="scss">
	.token {
		display: block;
		position: absolute;
		background: tomato;
	}
</style>
