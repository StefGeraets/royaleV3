import { writable } from 'svelte/store';

export type GameState = {
	isPlaying: boolean;
	currentTick: number;
	savedTick: number;
	currentPeriod: string;
};

export const gameState = (() => {
	const { subscribe, set, update } = writable<GameState>({
		isPlaying: false,
		currentTick: 0,
		savedTick: 0,
		currentPeriod: 'beforeStart'
	});

	return {
		subscribe,
		set,
		update,
		togglePlayPause: () => {
			gameState.update((gameState) => {
				if (!gameState.isPlaying) {
					gameState.savedTick = gameState.currentTick;
				}
				gameState.isPlaying = !gameState.isPlaying;
				return gameState;
			});
		},
		addTick: (tick: number) => {
			gameState.update((gameState) => {
				gameState.currentTick = gameState.savedTick + tick;
				return gameState;
			});
		},
		setCurrentPeriod: (name: string) => {
			gameState.update((gameState) => {
				gameState.currentPeriod = name;
				return gameState;
			});
		}
	};
})();
