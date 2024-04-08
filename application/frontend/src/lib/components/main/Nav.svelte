<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Nav.svelte
*
* Description: Main component that handles all the API calls, and 
* search functionality occurs here.
**************************************************************/ -->

<script lang="ts">
  import {
    Button,
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Dropdown,
    DropdownItem,
    Search,
  } from "flowbite-svelte";
  import { ChevronDownOutline, SearchOutline } from "flowbite-svelte-icons";
  import SFSULogo from "$lib/assets/SFSU.png";
  import { onMount } from "svelte";
  import { posts } from "../../store.js";

  const categories = [
    { id: 0, label: "All" },
    { id: 1, label: "Electronics" },
    { id: 2, label: "Furniture" },
    { id: 3, label: "Textbooks" },
    { id: 4, label: "Misc." },
  ];

  // Define a writable store for selected category
  export let selectedCategory = 0;

  // Define a writable store for search query
  export let searchQuery = "";

  function loadURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const search = urlParams.get("search");

    if (category) {
      selectedCategory = parseInt(category);
    }

    if (search) {
      searchQuery = search;
    }

    // Perform search if on the home page
    if (window.location.pathname === "/") {
      handleSearch();
    }
  }

  async function handleSearch(): Promise<void> {
    try {
      // Construct the URL with search parameters
      const url = new URL("/getPosts", window.location.origin);
      if (selectedCategory !== 0) {
        url.searchParams.append("category", selectedCategory.toString());
      }
      if (searchQuery.trim() !== "") {
        url.searchParams.append("search", searchQuery.trim());
      }

      const response = await fetch(url.toString());
      if (response.ok) {
        const data = await response.json();
        posts.set(data);
      } else {
        console.error("Failed to fetch posts");
      }

      // Update browser history with new search parameters without triggering a page reload
      const newUrl = `${window.location.pathname}${url.search}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Function to update selected category without triggering search
  function updateCategory(categoryId: number): void {
    selectedCategory = categoryId;
  }

  // redirects to handleSearch when "enter" or search button is pressed
  function searchExecution(): void {
    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      // If empty, perform search based on selected category
      handleSearch();
    }
  }

  // if "Enter" key is press redirect
  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      searchExecution();
    }
  }

  onMount(loadURL);
</script>

<Navbar
  class="bg-gray-900 text-white sticky top-0 z-50 flex justify-between items-center"
>
  <!-- Left side -->
  <NavBrand href="/" class="mr-10">
    <img src={SFSULogo} class="me-3 h-6 sm:h-20" alt="SFSU Logo" />
    <span
      class="self-center whitespace-nowrap text-5xl font-semibold dark:text-white"
    >
      GatorTrader
    </span>
  </NavBrand>
  <!-- Category selection -->
  <!-- search parameter query for url-->
  <div on:submit|preventDefault={handleSearch} class="flex">
    <Button
      class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700"
    >
      {categories[selectedCategory].label}
      <ChevronDownOutline class="w-2.5 h-2.5 ms-2.5" />
    </Button>
    <Dropdown class="w-40">
      {#each categories as { id, label }}
        <DropdownItem
          on:click={() => {
            updateCategory(id);
          }}
          class={selectedCategory === id ? "underline" : ""}
          style="color: black;"
        >
          {label}
        </DropdownItem>
      {/each}
    </Dropdown>

    <!-- Middle: Search query -->
    <div class="flex">
      <Search
        size="md"
        class="rounded-none py-2.5 mr-2"
        placeholder="Search GatorTrader..."
        bind:value={searchQuery}
        on:keypress={handleKeyPress}
      />
      <Button class="!p-2.5 rounded-s-none flex" on:click={searchExecution}>
        <SearchOutline class="w-5 h-5" />
      </Button>
    </div>
  </div>

  <!-- Right side -->
  <NavUl class="flex items-center">
    <NavLi href="/post" class="text-white text-2xl" active={true}>Post</NavLi>
    <NavLi href="/about" class="text-white text-2xl">About</NavLi>
    <NavLi href="/registration" class="text-white text-2xl">Login/SignUp</NavLi>
    <!-- {#if isLoggedIn}
      <NavLi href="/dashboard" class="text-white text-2xl">Dashboard</NavLi>
    {/if} -->
  </NavUl>
</Navbar>
