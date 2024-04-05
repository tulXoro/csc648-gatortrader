<script lang="ts">
  import { onMount } from "svelte";

  let posts: any[] = [];
  let helper = { start: 1, end: 10, total: 0 };
  let searchInput = "";

  // OPTIMIZE THIS FUNCTION SO THAT IT DOESNT REQUIRE FETCHING DATA
  async function fetchProductData() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      searchInput = urlParams.get("search") || ""; // Get search query from URL

      // Fetch data from server
      const response = await fetch("/getPosts");
      if (response.ok) {
        posts = await response.json();
        // Filter posts based on the search query and status
        const NumResults = posts.filter(
          (post) =>
            (!searchInput ||
              post.item_name
                .toLowerCase()
                .includes(searchInput.toLowerCase())) &&
            post.status === "APPROVED"
        );

        // Query Search Results
        helper.total = NumResults.length;
        helper.start = 1;
        helper.end = Math.min(NumResults.length, 10);
      } else {
        console.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  // Call fetchProductData function when the component mounts
  onMount(fetchProductData);
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
    {#if searchInput !== ""}
      {" for "}
      <span class="font-bold italic text-gray-900 dark:text-white">
        "{searchInput}"
      </span>
    {:else}
      {" "}
      <span class="font-semibold text-gray-900 dark:text-white"> All </span>
    {/if}
  </div>

  <!-- Display message if no results are found -->
  <div class="flex justify-center">
    <div class="text-xl text-black-500">
      {#if helper.total === 0}
        {#if searchInput !== ""}
          No results for "<span class="font-bold">{searchInput}</span>" found.
        {:else}
          No results found.
        {/if}
      {/if}
    </div>
  </div>
</div>
