<script lang="ts">
  import { onMount } from "svelte";
  import { searchQuery } from "../../store.js";

  let posts: any[] = [];
  let helper = { start: 1, end: 10, total: 0 }; // Initial pagination data
  let searchQueryText: string = "";

  async function fetchProductData() {
    try {
      // Get the search query parameter from the URL
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");

      // If a search query parameter is present, set it to the store
      if (searchParam) {
        searchQuery.set(searchParam);
      }

      // Fetch data based on the search query
      const response = await fetch("/getPosts");
      if (response.ok) {
        posts = await response.json();
        // Calculate the total number of "APPROVED" posts
        helper.total = posts.filter(
          (post) => post.status === "APPROVED"
        ).length;
      } else {
        console.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  // Call fetchProductData function when the component mounts
  onMount(fetchProductData);

  $: searchQueryText = $searchQuery ? $searchQuery.trim() : "";
</script>

{#if searchQueryText !== ""}
  <div class="flex flex-col margin-left gap-2">
    <div class="text-sm text-gray-700 dark:text-gray-400">
      <span class="font-semibold text-gray-900 dark:text-white">
        {helper.start}
      </span>
      -{" "}
      <span class="font-semibold text-gray-900 dark:text-white">
        {helper.end}
      </span>
      of over{" "}
      <span class="font-semibold text-gray-900 dark:text-white">
        {helper.total}
      </span>
      results for{" "}
      <span class="font-semibold text-gray-900 dark:text-white">
        "{searchQueryText}"
      </span>
    </div>
  </div>
{/if}
