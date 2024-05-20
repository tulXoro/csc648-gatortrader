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

  interface Category {
    id: number;
    label: string;
  }

  export let selectedCategory = 0;
  export let searchQuery = "";
  export let categories: Category[] = [];
  export let isLoggedIn = false;
  export let username = "";
  let showLogoutDropdown = false;

  const dispatch = createEventDispatcher();

  // Load search state from the store
  $: ({ selectedCategory, searchQuery } = get(searchState));

  async function loadCategories() {
    try {
      const response = await fetch("/getCategories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      // console.log("Fetched categories:", data);
      categories = data.map((category: any) => ({
        id: category.id,
        label: category.name,
      }));
      // console.log("Processed categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

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

  async function logout() {
    try {
      const response = await fetch("/login/logout", {
        method: "POST",
      });
      if (response.ok) {
        isLoggedIn = false;
        username = "";
        // Optionally, redirect to the home page or login page
        window.location.href = "/";
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  onMount(async () => {
    loadCategories();
    loadURL();
    await checkSessionStatus();
  });

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
        searchState.update((state) => ({ ...state, results: data }));
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
    searchState.update((state) => ({ ...state, selectedCategory }));
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
        {categories[selectedCategory]?.label || "All"}
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
        {#if isLoggedIn}
          <NavLi class="text-white text-2xl relative cursor-pointer">
            Welcome, {username}
            <ChevronDownOutline class=" w-3 h-3" />
          </NavLi>
          <Dropdown class="w-40">
            <DropdownItem href="/dashboard" class="text-black"
              >Dashboard</DropdownItem
            >
            <DropdownItem slot="footer" class="text-black" on:click={logout}
              >Sign out</DropdownItem
            >
          </Dropdown>
        {:else}
          <NavLi href="/registration" class="text-white text-2xl"
            >Register</NavLi
          >
        {/if}
      </NavUl>
    </div>
  </div></Navbar
>
