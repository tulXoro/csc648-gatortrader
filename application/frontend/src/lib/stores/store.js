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

// const initialPosts =JSON.parse(localStorage.getItem('posts')) || [];
// export const posts = writable(initialPosts);
export const posts = writable([]);
export const searchQuery = writable("");
export const updateTrigger = writable(0); //0: nothing, 1: dsc, 2: asc

// posts.subscribe((value) => {
//     localStorage.setItem('posts', JSON.stringify(value));
// });