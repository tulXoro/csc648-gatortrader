// **************************************************************
// * Class: CSC-648-03 Spring 2024
// * Team: 05
// * GitHub ID: csc648-sp24-03-team05
// * Project: SWE Final Project
// *
// * File: flashStore.js
// *
// * Description: contains flash store from svelte for alerts
// **************************************************************
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
