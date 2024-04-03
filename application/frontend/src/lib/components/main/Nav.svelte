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
  <NavBrand href="/" class="mr-10">
    <img src="/SFSU.png" class="me-3 h-6 sm:h-20" alt="SFSU Logo" />
    <span
      class="self-center whitespace-nowrap text-5xl font-semibold dark:text-white"
    >
      GatorTrader
    </span>
  </NavBrand>
  <!-- Category selection -->
  <!-- search parameter query for url-->
  <form on:submit|preventDefault={handleSearch} class="flex">
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
      />
      <Button class="!p-2.5 rounded-s-none">
        <SearchOutline class="w-5 h-5" />
      </Button>
    </div>
  </form>

  <!-- Right side -->
  <NavUl class="flex items-center">
    <NavLi href="/" class="text-white text-2xl" active={true}>Post</NavLi>
    <NavLi href="/about" class="text-white text-2xl">About</NavLi>
    <NavLi href="/" class="text-white text-2xl">Login/SignUp</NavLi>
  </NavUl>
</Navbar>
