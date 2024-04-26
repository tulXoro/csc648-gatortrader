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
  import { onMount, createEventDispatcher } from "svelte";
  import { posts } from "../../../stores/store.js";

  export let selectedCategory = 0;
  export let searchQuery = "";

  const dispatch = createEventDispatcher();
  const categories = [
    { id: 0, label: "All" },
    { id: 1, label: "Electronics" },
    { id: 2, label: "Furniture" },
    { id: 3, label: "Textbooks" },
    { id: 4, label: "Misc." },
  ];

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
      const url = new URL("/posts", window.location.origin);
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

  // provides search results
  async function searchExecution() {
    // Check if search query exceeds 40 characters to prevent injection
    if (searchQuery.trim().length > 40) {
      alert("Search query is too long. Please limit it to 40 characters.");
      return;
    } else if (searchQuery.trim() !== "") {
      await handleSearch();
      dispatch("searchButtonClick");
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

<Navbar class="bg-gray-900 text-white sticky top-0 md:py-5">
  <!-- Left side -->
  <div class="flex">
    <NavBrand href="/">
      <img src={SFSULogo} class="me-5 h-20" alt="SFSU Logo" />
      <span class="text-6xl font-bold dark:text-white">GatorTrader</span>
    </NavBrand>
    <div class="flex items-center ml-10">
      <NavUl>
        <NavLi href="/about" class="text-white text-2xl">About</NavLi>
      </NavUl>
      <!-- Middle: Search query -->
      <Button
        class="rounded-e-none border-e-0 !p-4"
        style="background-color:lightgray; color: black;"
      >
        {categories[selectedCategory].label}
        <ChevronDownOutline class="w-5 h-5" />
      </Button>
      <Dropdown>
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

      <!-- Search -->
      <Search
        class="flex-grow rounded-none py-3 mr-4 w-full"
        placeholder={selectedCategory === 3
          ? "Search by course, title, or professor"
          : "Search GatorTrader..."}
        bind:value={searchQuery}
        on:keypress={handleKeyPress}
      />
      <Button
        class="border-e-0 rounded-s-none !p-4"
        style="background-color:steelblue; color: white;"
        on:click={searchExecution}
      >
        <SearchOutline class="w-5 h-5" />
      </Button>

      <!-- Right side -->
      <NavUl class="flex flex-row">
        <NavLi href="/post" class="text-white text-2xl">Post</NavLi>
        <NavLi href="/dashboard" class="text-white text-2xl">Dashboard</NavLi>
        <NavLi href="/registration" class="text-white text-2xl">Login</NavLi>
        <!-- {#if isLoggedIn}
          <NavLi href="/dashboard" class="text-white text-2xl mb-4 sm:mb-0">Dashboard</NavLi>
          {/if} -->
      </NavUl>
    </div>
  </div>
</Navbar>
