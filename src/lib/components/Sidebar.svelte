<script lang="ts">
	import { gameState } from '$lib/stores/gameState';

	const togglePlayPause = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			gameState.togglePlayPause();
			console.log('Game is playing', $gameState.isPlaying);
		}
	};
</script>

<svelte:window on:keydown|preventDefault={togglePlayPause} />

<aside>
	<h1>Sidebar</h1>
	{#if $gameState.isPlaying}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-player-pause-filled"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path
				d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
				stroke-width="0"
				fill="currentColor"
			></path>
			<path
				d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
				stroke-width="0"
				fill="currentColor"
			></path>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-player-play-filled"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path
				d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
				stroke-width="0"
				fill="currentColor"
			></path>
		</svg>
	{/if}
</aside>

<style lang="scss">
	aside {
		width: 20%;
		background: gainsboro;
	}
</style>
