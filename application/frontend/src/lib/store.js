import { writable } from "svelte/store";

export const posts = writable([]);

// for search query in ./Results
export const searchQuery = writable("");
