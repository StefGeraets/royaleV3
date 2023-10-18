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
		circleSize: 20,
		gameTime: 1.5 * 60,
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
	const circleSizes = [20, 12, 5, 1.5];
	const roundSettings = derived([gameSettings, _roundNumber], ([$gameSettings, $_roundNumber]) => {
		return {
			s: $gameSettings,
			currentRound: $_roundNumber,
			sizes: circleSizes,
			currentRingSize: circleSizes[$_roundNumber - 1] * $gameSettings.cellSize,
			nextRingSize: circleSizes[$_roundNumber] * $gameSettings.cellSize
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
