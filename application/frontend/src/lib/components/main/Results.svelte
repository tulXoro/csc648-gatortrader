<script lang="ts">
  import { onMount } from "svelte";
  import { posts, searchQuery } from "../../store.js"; // Import the shared store.js file

  // Store filtered posts and pagination helper
  let filteredPosts: any[] = [];
  let helper = { start: 1, end: 10, total: 0 };

  // Function to filter posts based on the current search query
  function filterPosts() {
    const query = $searchQuery;

    const postsArray = $posts as any[];
    // status and name
    filteredPosts = postsArray.filter(
      (post) =>
        (!query ||
          post.item_name.toLowerCase().includes(query.toLowerCase())) &&
        post.status === "APPROVED"
    );

    helper.total = filteredPosts.length;
    helper.start = 1;
    helper.end = Math.min(filteredPosts.length, 10);
  }

  // Subscribe to update search results
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  $: {
    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout
    timeoutId = setTimeout(filterPosts, 300); // Debounce filter function
  }

  // Fetch initial data
  onMount(filterPosts);
</script>

<div class="flex flex-col margin-left gap-2">
  <div class="text-sm text-gray-700 dark:text-gray-400">
    <!-- Display pagination information -->
    <span class="font-semibold text-gray-900 dark:text-white">
      {helper.start}
    </span>
    {" - "}
    <span class="font-semibold text-gray-900 dark:text-white">
      {helper.end}
    </span>
    {" of over "}
    <span class="font-semibold text-gray-900 dark:text-white">
      {helper.total}
    </span>
    {" results "}
    <!-- Display search query if available -->
    {#if $searchQuery !== ""}
      {" for "}
      <span class="font-bold italic text-gray-900 dark:text-white">
        {$searchQuery}
      </span>
    {/if}
  </div>

  <!-- Display message if no results are found -->
  <div class="flex justify-center">
    <div class="text-xl text-black-500">
      {#if helper.total === 0}
        {#if $searchQuery !== ""}
          No results for "<span class="font-bold">{$searchQuery}</span>" found.
        {:else}
          No results found.
        {/if}
      {/if}
    </div>
  </div>
</div>
