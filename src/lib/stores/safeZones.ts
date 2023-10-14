import { writable } from "svelte/store";

export type RingPos = {
  left: number,
  top: number
}

export type SafeZones = {
  current: RingPos,
  next?: RingPos
}

export const safeZones = (() => {
  const { subscribe, set, update } = writable<SafeZones>({current: {left: 0, top: 0}});

  return {
    subscribe,
    set,
    update,
    setNext: (position: RingPos) => {
      update((safeZones) => {
        if (!safeZones.next) {
          safeZones.next = position
          return safeZones
        }

        safeZones.current = safeZones.next;
        safeZones.next = position
        return safeZones;
      })
    }
  }
})()