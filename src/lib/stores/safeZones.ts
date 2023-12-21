import { writable } from 'svelte/store';

export type RingPos = {
	left: number;
	top: number;
	x: number;
	y: number;
};

export type SafeZones = {
	previous: RingPos;
	current: RingPos | undefined;
	next?: RingPos;
};

export const safeZones = (() => {
	const { subscribe, set, update } = writable<SafeZones>({
		previous: { left: 0, top: 0, x: 0, y: 0 },
		current: undefined
	});

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
