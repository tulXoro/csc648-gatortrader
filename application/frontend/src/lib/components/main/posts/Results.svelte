<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Results.svelte
*
* Description: Component to display top left a query search 
* result for every search entered 
**************************************************************/ -->

<script lang="ts">
  import { derived } from "svelte/store";
  import { posts, searchQuery } from "../../../stores/store.js";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";

  let searchInput = "";

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      searchQuery.set(searchParam);
      searchInput = searchParam;
    }
  }

  const helper = derived(posts, ($posts) => ({
    start: Math.min($posts.length, 1),
    end: Math.min($posts.length, 10),
    total: $posts.length,
  }));
</script>

<div class="flex flex-col gap-2">
  {#if $helper.total === 1 || $helper.total > 0}
    <div class="text-sm text-gray-700 dark:text-gray-400">
      <span class="font-semibold text-gray-900 dark:text-white">
        {$helper.start}
      </span>
      {"-"}
      <span class="font-semibold text-gray-900 dark:text-white">
        {$helper.end}
      </span>
      {" of "}
      <span class="font-semibold text-gray-900 dark:text-white">
        {$helper.total}
      </span>
      {" result "}
      <!-- Display search query if available -->
      {#if searchInput !== ""}
        {" for "}
        <span class="font-bold italic text-gray-900 dark:text-white">
          "{searchInput}"
        </span>
      {/if}
    </div>
  {/if}

  <!-- <Button
    class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700"
  >
    Sort By:<ChevronDownOutline class="w-2.5 h-2.5 ms-2.5" />
  </Button>
  <Dropdown class="w-45">
    <DropdownItem on:click={() => {}} style="color: black;">
      <DropdownItem>Price: Low to high (Default)</DropdownItem>
      <DropdownItem>Price: High to low (Default)</DropdownItem>
    </DropdownItem>
  </Dropdown> -->

  <!-- Display message if no results are found -->
  <div class="flex justify-center">
    <div class="text-xl text-black-500">
      {#if $helper.total === 0}
        No results for "<span
          class="font-bold italic text-gray-900 dark:text-white"
          >{searchInput}</span
        >" found.
      {/if}
    </div>
  </div>
</div>
