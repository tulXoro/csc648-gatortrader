// src/stores/searchStore.js
import { writable } from "svelte/store";

export const searchState = writable({
  selectedCategory: 0,
  searchQuery: "",
  results: [],
});
