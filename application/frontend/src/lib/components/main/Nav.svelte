<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Button,
    Input,
  } from "flowbite-svelte";
  import { SearchSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  let selectedCategory: string = ""; // Initialize selected category
  let searchQuery: string = ""; // Initialize search query

  // Function to handle search
  function handleSearch(): void {
    console.log("Category:", selectedCategory);
    console.log("Search Query:", searchQuery);
    // Implement your search logic here
  }

  // Function to update search query
  function updateSearch(event: Event): void {
    searchQuery = (event.target as HTMLInputElement).value;
  }

  // Function to update selected category
  function updateCategory(event: Event): void {
    selectedCategory = (event.target as HTMLSelectElement).value;
    // Call function to fetch posts based on selected category
    fetchPosts(selectedCategory, searchQuery);
  }

  // Function to fetch posts based on category and search query
  async function fetchPosts(category: string, query: string): Promise<void> {
    try {
      const response = await fetch(
        `/getPosts?category=${category}&search=${query}`
      );
      const data = await response.json();
      console.log(data); // Log retrieved posts
      // Update UI with retrieved posts
      // Example: You can update a variable bound to a list of posts in your Svelte component
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  onMount(() => {
    // Update selected category when the component mounts
    selectedCategory = (
      document.querySelector("#category-select") as HTMLSelectElement
    ).value;
  });
</script>

<Navbar class="bg-gray-900 text-white sticky top-0 z-50">
  <NavBrand href="/" class="ml-auto mr-10">
    <img src="/SFSU.png" class="me-3 h-6 sm:h-20" alt="SFSU Logo" />
    <span
      class="self-center whitespace-nowrap text-5xl font-semibold dark:text-white"
      >GatorTrader</span
    >
  </NavBrand>

  <div class="hidden md:flex flex-grow items-center relative">
    <!-- Dropdown Menu -->
    <div class="relative">
      <select
        id="category-select"
        class="rounded-l-md px-4 py-2 bg-gray-800 text-black"
        bind:value={selectedCategory}
        on:change={updateCategory}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Textbooks">Textbooks</option>
        <!-- Add more options as needed -->
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
      >
        <!-- Dropdown Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500 dark:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <!-- Search Input -->
    <Input
      id="search"
      class="w-full px-4 py-2 rounded-r-md border-l-0 bg-gray-800 text-white"
      placeholder="Search GatorTrader"
      bind:value={searchQuery}
      on:input={updateSearch}
    />

    <!-- Search Button -->
    <Button class="!p-3" on:click={handleSearch}
      ><SearchSolid class="w-5 h-5" /></Button
    >

    <!-- Navigation Links -->
    <NavUl>
      <NavLi href="/" class="text-white text-2xl" active={true}>Post</NavLi>
      <NavLi href="/about" class="text-white text-2xl">About</NavLi>
      <NavLi href="/" class="text-white text-2xl">Login/SignUp</NavLi>
    </NavUl>
  </div>
</Navbar>
