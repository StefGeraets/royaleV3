import { gameRound, type GameEvent } from '$lib/stores/gameSettings';
import { gameState } from '$lib/stores/gameState';
import { safeZones } from '$lib/stores/safeZones';

export const triggerEvent = (event: GameEvent) => {
	switch (event.name) {
		case 'zoneStart':
			console.log('zoneStart', event);
			zoneStart();
			break;
		case 'zoneCountdown':
			console.log('zoneCountdown', event);
			zoneCountdown(event);
			break;
		case 'zoneShrink':
			console.log('zoneShrink', event);
			zoneShrink();
			break;
		default:
			break;
	}
};

const zoneStart = () => {};

const zoneCountdown = (event: GameEvent) => {
	safeZones.setCurrent();
	gameRound.nextRound();
	console.log(event);
	gameState.showCountdown();
};

const zoneShrink = () => {
	gameState.hideCountdown();
};
