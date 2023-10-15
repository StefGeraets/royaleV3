import { gameRound, type GameEvent } from '$lib/stores/gameSettings';
import { safeZones } from '$lib/stores/safeZones';

export const triggerEvent = (event: GameEvent) => {
	switch (event.name) {
		case 'zoneStart':
			console.log('zoneStart', event);
			zoneStart(event);
			break;
		case 'zoneCountdown':
			console.log('zoneCountdown', event);
			zoneCountdown(event);
			break;
		case 'zoneShrink':
			console.log('zoneShrink', event);
			zoneShrink(event);
			break;
		default:
			break;
	}
};

const zoneStart = (event: GameEvent) => {};

const zoneCountdown = (event: GameEvent) => {
	safeZones.setCurrent();
	gameRound.nextRound();
};

const zoneShrink = (event: GameEvent) => {};
