import { writable } from "svelte/store";

function createFlashStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (message, type = "info", timeout = 3000) => {
      const id = Date.now();
      update((messages) => [...messages, { id, message, type }]);

      setTimeout(() => {
        update((messages) => messages.filter((msg) => msg.id !== id));
      }, timeout);
    },
    clear: () => set([]),
  };
}

export const flashStore = createFlashStore();
