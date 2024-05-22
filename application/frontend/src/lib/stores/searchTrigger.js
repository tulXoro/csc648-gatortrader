// **************************************************************
// * Class: CSC-648-03 Spring 2024
// * Team: 05
// * GitHub ID: csc648-sp24-03-team05
// * Project: SWE Final Project
// *
// * File: searchTrigger.js
// *
// * Description: triggers the search query when ever an
// * action is done in nav
// **************************************************************
import { writable } from "svelte/store";

export const searchTrigger = writable(false);
