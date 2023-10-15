import { derived, writable } from 'svelte/store';
import { events } from '$lib/constants';

export type GameSettings = {
	cellSize: number;
	gridCells: number;
	circleSize: number;
	gameTime: number;
	darkMode: boolean | 'prefered';
};

export type GameEvent = {
	triggerTime: number;
	name: string;
	duration: number;
};

export const gameSettings = (() => {
	const { subscribe, set, update } = writable<GameSettings>({
		cellSize: 32,
		gridCells: 24,
		// circleSize: 20,
		circleSize: 1.5,
		gameTime: 2 * 60,
		darkMode: false
	});

	return {
		subscribe,
		set,
		update
	};
})();

export const gameTime = (() => {
	// time in seconds
	const stageTimes = derived(gameSettings, ($gameSettings) => {
		return {
			events: events.map((event) => ({
				triggerTime: Math.round($gameSettings.gameTime * (event.percentage / 100)),
				name: event.name,
				duration: Math.round($gameSettings.gameTime * (event.value / 100))
			}))
		};
	});

	return {
		...stageTimes
	};
})();

export const gameRound = (() => {
	const _roundNumber = writable<number>(0);
	const roundSettings = derived([gameSettings, _roundNumber], ([$gameSettings, $_roundNumber]) => {
		return {
			s: $gameSettings,
			currentRound: $_roundNumber
		};
	});

	return {
		nextRound: () => {
			_roundNumber.update((_roundNumber) => {
				_roundNumber++;
				return _roundNumber;
			});
		},
		...roundSettings
	};
})();
