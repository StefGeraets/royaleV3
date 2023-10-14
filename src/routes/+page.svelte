<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Grid from '../lib/components/Grid.svelte';
</script>

<main>
	<div id="map">
		<Grid />
	</div>
	<Sidebar />
</main>

<style lang="scss">
	main {
		display: flex;
		height: 100vh;
	}

	#map {
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
