import { writable } from 'svelte/store';

export type GameSettings = {
	cellSize: number;
	gridCells: number;
	circleSize: number;
};

export const gameSettings = (() => {
	const { subscribe, set, update } = writable<GameSettings>({
		cellSize: 32,
		gridCells: 24,
		circleSize: 20
	});

	return {
		subscribe,
		set,
		update
	};
})();
