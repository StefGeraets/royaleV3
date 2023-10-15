<script lang="ts">
	import { gameState } from '$lib/stores/gameState';
	import { gameRound, gameSettings, gameTime } from '$lib/stores/gameSettings';

	const togglePlayPause = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			gameState.togglePlayPause();

			console.log('Game is playing', $gameState.isPlaying);
		}
	};

	const stopGame = (gameEnd: boolean) => {
		if (gameEnd) gameState.togglePlayPause();
	};

	const svgPath = {
		sun: 'M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z',
		moon: 'M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z'
	};

	const toggleDarkmode = () => {
		gameSettings.update((gameSettings) => {
			gameSettings.darkMode = !gameSettings.darkMode;
			return gameSettings;
		});
	};

	$: currentEvent = $gameTime.events.find((event) => event.triggerTime === $gameState.currentTick);
	$: stopGame($gameSettings.gameTime === $gameState.currentTick ? true : false);
</script>

<svelte:window on:keydown|preventDefault={togglePlayPause} />

<aside>
	<h1>
		Sidebar
		<div
			class="darkModeSwitch"
			on:click={() => toggleDarkmode()}
			on:keydown
			role="button"
			tabindex="0"
		>
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				fill="currentColor"
			>
				<path d={$gameSettings.darkMode ? svgPath.sun : svgPath.moon} />
			</svg>
		</div>
	</h1>
	<p>currentTick {$gameState.currentTick} | {$gameRound.currentRound}</p>
	<p>Total Game Time {$gameSettings.gameTime}</p>
	<p>CurrentEvent {currentEvent?.name}</p>
	<p>Current Period {$gameState.currentPeriod}</p>

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

	:global(.dark)aside {
		background: rgba(255, 255, 255, 0.01);
		color: #fff;
	}

	h1 {
		display: flex;
		justify-content: space-between;
	}

	.darkModeSwitch {
		color: rgba(0, 0, 0, 0.8);
		.icon {
			width: 1rem;
			height: 1rem;
		}
	}

	:global(.dark) .darkModeSwitch {
		color: #fff;
	}
</style>
