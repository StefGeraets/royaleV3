<script lang="ts">
	import { triggerEvent } from '$lib/logic/eventHandler';
	import { gameTime, type GameEvent } from '$lib/stores/gameSettings';
	import { gameState } from '$lib/stores/gameState';

	const handleEvent = (currentEvent: GameEvent | undefined) => {
		if (currentEvent !== undefined) {
			triggerEvent(currentEvent);
			gameState.setCurrentPeriod(currentEvent.name);
		}
	};
	$: currentEvent = $gameTime.events.find((event) => event.triggerTime === $gameState.currentTick);
	$: handleEvent(currentEvent);
</script>

<div class="map">
	<slot />
</div>

<style lang="scss">
	.map {
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
