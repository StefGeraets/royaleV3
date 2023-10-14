import { writable } from 'svelte/store';

export type GameState = {
	isPlaying: boolean;
};

export const gameState = (() => {
	const { subscribe, set, update } = writable<GameState>({
		isPlaying: false
	});

	return {
		subscribe,
		set,
		update,
		togglePlayPause: () => {
			gameState.update((gameState) => {
				gameState.isPlaying = !gameState.isPlaying;
				return gameState;
			});
		}
	};
})();
