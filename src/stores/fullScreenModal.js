import { writable } from 'svelte/store';

export function closeFullScreenModal() {
  fullScreenModalStore.set({ component: null });
}

export const fullScreenModalStore = writable({ component: null });
