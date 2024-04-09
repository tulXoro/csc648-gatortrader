// **************************************************************
// * Class: CSC-648-03 Spring 2024
// * Team: 05
// * GitHub ID: csc648-sp24-03-team05
// * Project: SWE Final Project
// *
// * File: store.js
// *
// * Description: Two Svelte writable stores: posts to manage
// * an array of posts and searchQuery to handle a search query
// * string which enables reactive state management.
// **************************************************************/

import { writable } from "svelte/store";

export const posts = writable([]);
export const searchQuery = writable("");
