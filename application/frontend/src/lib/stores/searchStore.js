// **************************************************************
// * Class: CSC-648-03 Spring 2024
// * Team: 05
// * GitHub ID: csc648-sp24-03-team05
// * Project: SWE Final Project
// *
// * File: src/stores/searchStore.js
// *
// * Description: stores the search query information here
// **************************************************************
//
import { writable } from "svelte/store";

export const searchState = writable({
  selectedCategory: 0,
  searchQuery: "",
  results: [],
});
