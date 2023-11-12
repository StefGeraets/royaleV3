import { writable } from 'svelte/store';

export type GameState = {
	isPlaying: boolean;
	currentTick: number;
	savedTick: number;
	currentPeriod: string;
	showCountdown: boolean;
};

export const gameState = (() => {
	const { subscribe, set, update } = writable<GameState>({
		isPlaying: false,
		currentTick: 0,
		savedTick: 0,
		currentPeriod: 'beforeStart',
		showCountdown: false
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
		endGame: () => {
			gameState.update((gameState) => {
				gameState.savedTick = 0;
				gameState.currentTick = 0;
				gameState.isPlaying = false;
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
		},
		showCountdown: () => {
			gameState.update((gameState) => {
				gameState.showCountdown = true;
				return gameState;
			});
		},
		hideCountdown: () => {
			gameState.update((gameState) => {
				gameState.showCountdown = false;
				return gameState;
			});
		}
	};
})();
