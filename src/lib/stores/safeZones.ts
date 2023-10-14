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
    setCurrent: () => {
      update((safeZones) => {
        if (safeZones.next) {
          safeZones.current = safeZones.next
          return safeZones
        }
        return safeZones
      })
    },
    setNext: (position: RingPos) => {
      update((safeZones) => {
        safeZones.next = position
        return safeZones
      })
    }
  }
})()