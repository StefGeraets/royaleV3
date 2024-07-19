<script lang="ts">
	import CounterWorker from '$lib/components/CounterWorker.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import { gameState } from '$lib/stores/gameState';
	import { gameSettings } from '$lib/stores/gameSettings';
	import Map from '$lib/components/Map.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
</script>

<main class:dark={$gameSettings.darkMode}>
	<Map>
		<Grid />
	</Map>
	<TimeLine />
	<Sidebar />
</main>
{#if $gameState.isPlaying}
	<CounterWorker />
{/if}

<style lang="scss">
	main {
		display: flex;
		height: 100vh;

		&.dark {
			background: #09090b;
		}
	}

	:global(.dark)main {
		background: rgb(0, 0, 0);
	}
</style>
