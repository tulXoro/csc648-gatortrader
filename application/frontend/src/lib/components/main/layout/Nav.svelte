<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Nav.svelte
*
* Description: Navigation bar component for the application.
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
  import { searchState } from "../../../stores/searchStore";
  import { get } from "svelte/store";
  import { flashStore } from "$lib/stores/flashStore.js";
  // import { username } from "$lib/stores/username.js";
  import { searchTrigger } from "$lib/stores/searchTrigger.js";

  // Define the interface for categories
  interface Category {
    id: number;
    label: string;
  }

  // Define exported props for the component
  let selectedCategory = 0;
  let searchQuery = "";
  let categories: Category[] = [];
  let isLoggedIn = false;
  export let username = "";

  const dispatch = createEventDispatcher();

  // Load search state from the store
  $: ({ selectedCategory, searchQuery } = get(searchState));

  // Function to load categories from the server
  async function loadCategories() {
    try {
      const response = await fetch("/getCategories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      categories = data.map((category: any) => ({
        id: category.id,
        label: category.name,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Function to check the session status of the user
  async function checkSessionStatus() {
    try {
      const response = await fetch("/login/status");
      if (response.ok) {
        const data = await response.json();
        isLoggedIn = data.isLoggedIn;
        if (isLoggedIn) {
          username = data.username;
        }
      } else {
        console.error("Failed to fetch session status:", response.statusText);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }

  // Function to log the user out
  async function logout() {
    try {
      const response = await fetch("/login/logout", {
        method: "POST",
      });
      if (response.ok) {
        isLoggedIn = false;
        username = "";
        triggerSuccess("Logged out successfully.");

        // Delay redirection to allow flash message to be displayed
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  // onMount lifecycle hook to perform initial setup
  onMount(async () => {
    loadCategories(); // Load categories from the server
    await checkSessionStatus(); // Check if the user is logged in
    loadURL(); // Load the current search state from the URL

    if (isBrowsePage()) {
      performSearch(); // Perform the search if we are on the browse page
    }
  });

  // Function to check if the current page is the browse page
  function isBrowsePage(): boolean {
    return window.location.pathname === "/browse";
  }

  // Function to load search state from the URL
  function loadURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const search = urlParams.get("search");

    if (category) {
      selectedCategory = parseInt(category);
      searchState.update((state) => ({ ...state, selectedCategory }));
    }

    if (search) {
      searchQuery = search;
      searchState.update((state) => ({ ...state, searchQuery }));
    }
  }

  // Function to handle the search request
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

      // Fetch the search results
      // const response = await fetch(url.toString());
      // if (response.ok) {
      //   const data = await response.json();
      //   posts.set(data);
      //   searchState.update((state) => ({ ...state, results: data }));
      // } else {
      //   console.error("Failed to fetch posts");
      // }

      // Update the URL without reloading the page
      const newUrl = `/browse${url.search}`;
      if (!isBrowsePage()) {
        window.location.href = newUrl;
      } else {
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
      searchTrigger.set(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Function to perform the search
  async function performSearch() {
    await handleSearch();
  }

  // Function to update the selected category
  function updateCategory(categoryId: number): void {
    selectedCategory = categoryId;
    searchState.update((state) => ({ ...state, selectedCategory }));
  }

  // Function to execute the search when the search button is clicked
  async function searchExecution() {
    if (searchQuery.trim().length > 40) {
      triggerError(
        "Search query is too long. Please limit it to 40 characters."
      );
      return;
    }
    await handleSearch();
    dispatch("searchButtonClick");
  }

  // Function to handle the Enter key press in the search input
  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      searchExecution();
    }
  }
  function triggerError(message: string) {
    flashStore.add(message, "error", 5000);
  }
  function triggerSuccess(message: string) {
    flashStore.add(message, "success", 5000);
  }
</script>

<nav class="bg-gray-900 text-white sticky top-0 md:py-10">
  <div class="flex items-center justify-between w-full px-5">
    <a href="/" class="flex items-center">
      <img src={SFSULogo} class="mr-3 h-20" alt="SFSU Logo" />
      <span class="text-5xl font-bold dark:text-white">GatorTrader</span>
    </a>
    <div class="flex items-center space-x-4 flex-grow justify-center">
      <ul class="flex items-center space-x-4">
        <li>
          <a href="/about" class="ml-5 mr-5 text-white text-2xl">About</a>
        </li>
      </ul>
      <div class="flex items-center space-x-0">
        <Button
          class="rounded-e-none border-e-0 !p-5"
          style="background-color:lightgray; color: black;"
        >
          {categories[selectedCategory]?.label || "All"}
          <ChevronDownOutline class="w-5 h-5" />
        </Button>
        <Dropdown>
          {#each categories as { id, label }}
            <DropdownItem
              on:click={() => updateCategory(id)}
              class={selectedCategory === id ? "underline" : ""}
              style="color: black;"
            >
              {label}
            </DropdownItem>
          {/each}
        </Dropdown>
        <Search
          class="rounded-none py-4"
          style="width: 400px;"
          placeholder={selectedCategory === 3
            ? "Search by course, title, or professor"
            : "Search GatorTrader..."}
          bind:value={searchQuery}
          on:keypress={handleKeyPress}
        />
        <Button
          class="border-e-0 rounded-s-none !p-5"
          style="background-color:steelblue; color: white;"
          on:click={searchExecution}
        >
          <SearchOutline class="flex w-5 h-5" />
        </Button>
      </div>
      <ul class="flex items-center space-x-4">
        <li>
          <a href="/post" class="ml-5 mr-5 text-white text-2xl">Post</a>
        </li>
        {#if isLoggedIn}
          <div class="flex items-center space-x-2">
            <li
              class="text-white text-2xl relative cursor-pointer flex items-center space-x-2"
            >
              <span class="text-white text-2xl">Welcome, {username}</span>
              <ChevronDownOutline class="flex w-5 h-5" />
            </li>
            <Dropdown class="w-40">
              <DropdownItem href="/dashboard" class="text-black">
                Dashboard
              </DropdownItem>
              <DropdownItem slot="footer" class="text-black" on:click={logout}>
                Sign out
              </DropdownItem>
            </Dropdown>
          </div>
        {:else}
          <li>
            <a href="/registration" class="ml-5 text-white text-2xl">
              Register
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
