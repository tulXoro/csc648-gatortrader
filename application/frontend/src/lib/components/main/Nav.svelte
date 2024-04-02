<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Dropdown,
    DropdownItem,
    Search,
  } from "flowbite-svelte";
  import { ChevronDownOutline, SearchOutline } from "flowbite-svelte-icons";

  import { posts } from "../../store.js";
  import { goto } from "$app/navigation";

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
  let searchQuery = "";

  async function handleSearch(): Promise<void> {
    try {
      const url = new URL("/getPosts", window.location.origin);

      // Append selected category to URL if it's not 0 (All)
      if (selectedCategory !== 0) {
        url.searchParams.append("category", selectedCategory.toString());
      }

      // Append search query to URL if it's not empty
      if (searchQuery.trim() !== "") {
        url.searchParams.append("search", searchQuery.trim());
      }

      const response = await fetch(url.toString());
      goto(`?${url.toString()}`);

      if (response.ok) {
        const data = await response.json();
        posts.set(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Function to update selected category and trigger search
  function updateCategory(categoryId: number): void {
    selectedCategory = categoryId;
    handleSearch();
  }

  // Function to update search query
  function updateSearch(event: InputEvent): void {
    searchQuery = (event.target as HTMLInputElement).value;
  }

  // Function to handle Enter key press in search input
  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      handleSearch();
    }
  }
</script>

<Navbar
  class="bg-gray-900 text-white sticky top-0 z-50 flex justify-between items-center"
>
  <!-- Left side -->
  <div class="flex items-center">
    <NavBrand href="/" class="mr-10">
      <img src="/SFSU.png" class="me-3 h-6 sm:h-20" alt="SFSU Logo" />
      <span
        class="self-center whitespace-nowrap text-5xl font-semibold dark:text-white"
      >
        GatorTrader
      </span>
    </NavBrand>

    <div class="flex items-center justify-between">
      <!-- Left side: Category selection -->
      <div class="relative flex items-center">
        <button
          class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700"
          style="color: white;"
        >
          {categories[selectedCategory].label}
          <ChevronDownOutline class="flex w-2.5 h-2.5 ms-2.5" />
        </button>
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
      </div>

      <!-- Middle: Search query -->
      <form on:submit|preventDefault={handleSearch} class="flex-1 flex">
        <Search
          size="md"
          class="rounded-none py-2.5"
          placeholder="Search GatorTrader..."
          style="width: 100%;"
          bind:value={searchQuery}
        />
        <button type="submit" class="!p-2.5 rounded-s-none">
          <SearchOutline class="w-5 h-5" />
        </button>
      </form>
    </div>

    <!-- Right side -->
    <NavUl>
      <NavLi href="/" class="text-white text-2xl" active={true}>Post</NavLi>
      <NavLi href="/about" class="text-white text-2xl">About</NavLi>
      <NavLi href="/" class="text-white text-2xl">Login/SignUp</NavLi>
    </NavUl>
  </div>
</Navbar>
