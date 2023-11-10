import { writable } from 'svelte/store';

export type RingPos = {
	left: number;
	top: number;
	x: number;
	y: number;
};

export type SafeZones = {
	current: RingPos | undefined;
	next?: RingPos;
};

export const safeZones = (() => {
	const { subscribe, set, update } = writable<SafeZones>({ current: undefined });

	return {
		subscribe,
		set,
		update,
		setCurrent: () => {
			update((safeZones) => {
				if (safeZones.next) {
					safeZones.current = safeZones.next;
					return safeZones;
				}
				return safeZones;
			});
		},
		setNext: (position: RingPos) => {
			update((safeZones) => {
				safeZones.next = position;
				return safeZones;
			});
		}
	};
})();
