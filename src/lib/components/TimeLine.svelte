<script lang="ts">
	import { gameSettings } from '$lib/stores/gameSettings';
	import { gameState } from '$lib/stores/gameState';
	import { events } from '$lib/constants';
	const colors = {
		beforeStart: 'rgba(0,0,0,0.25)',
		zoneStart: 'rgba(0,0,0,0.15)',
		zoneCountdown: '#16A34A',
		zoneShrink: '#DC2626'
	};

	const gradientPercentages = events.map((event, i) => {
		if (events[i + 1] === undefined) {
			return {
				start: event.percentage,
				end: 100,
				name: event.name
			};
		}
		return {
			start: event.percentage,
			end: events[i + 1].percentage,
			name: event.name
		};
	});

	const gradientSteps = gradientPercentages.map((stage) => {
		return `${colors[stage.name]} ${stage.start}%, ${colors[stage.name]} ${stage.end}%`;
	});

	let gradient = `linear-gradient(to bottom, ${gradientSteps.join(', ')})`;
</script>

<div
	class="timeline"
	style:background={gradient}
	style:--game-time="{$gameSettings.gameTime}s"
	style:--animation-state={$gameState.isPlaying ? 'running' : 'paused'}
>
	<div class="timebar"></div>
</div>

<style>
	.timeline {
		width: 20px;
		height: 100vh;
		position: relative;
	}

	.timebar {
		height: 1px;
		width: 100%;
		background: black;
		position: absolute;
		left: 0;
		top: 0;
		animation: gameTimeIndicator var(--game-time) linear forwards;
		animation-play-state: var(--animation-state);
	}

	:global(.dark) .timebar {
		background: #fff;
	}

	@keyframes gameTimeIndicator {
		from {
			top: 0;
		}
		to {
			top: 100%;
		}
	}
</style>
