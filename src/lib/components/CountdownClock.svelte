<script lang="ts">
	import { gameTime, type GameEvent } from '$lib/stores/gameSettings';
	import { gameState } from '$lib/stores/gameState';

	let countdownTime = 0;
	let triggerTime = 0;

	const countDown = (event: GameEvent, tick: number) => {
		if (event) {
			countdownTime = event.duration;
			triggerTime = event.triggerTime;
		}
		let time = tick - triggerTime;
		return countdownTime - time - 1;
	};

	$: currentEvent = $gameTime.events.find(
		(event) => event.triggerTime === $gameState.currentTick
	) as GameEvent;

	$: timeLeft = countDown(currentEvent, $gameState.currentTick);

	const convertStoMs = (seconds: number) => {
		let minutes = ~~(seconds / 60);
		let extraSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${extraSeconds.toString().padStart(2, '0')}`;
	};
</script>

<div class="clock" class:show={$gameState.showCountdown}>
	<h4>Restrict in:</h4>
	<p>{convertStoMs(timeLeft)}</p>
</div>

<style lang="scss">
	.clock {
		background: rgba(0, 0, 0, 0.75);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		position: absolute;
		top: 1rem;
		left: 1rem;
		padding: 8px 16px;
		display: none;

		&.show {
			display: block;
		}

		h4 {
			font-size: 1.5em;
			text-transform: uppercase;
			color: white;
			margin: 0;
			padding: 0;
		}

		p {
			color: orange;
			font-size: 3rem;
			line-height: 1;
			font-family: monospace;
		}
	}
</style>
