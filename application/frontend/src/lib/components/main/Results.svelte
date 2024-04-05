<script lang="ts">
  import { onMount } from "svelte";
  import { derived } from "svelte/store";

  import { posts } from "../../store.js";

  let searchInput = "";

  const helper = derived(posts, $posts => ({
    start: Math.min($posts.length, 1),
    end: Math.min($posts.length, 10),
    total: $posts.length,
  }));

</script>

<div class="flex flex-col margin-left gap-2">
  <div class="text-sm text-gray-700 dark:text-gray-400">
    <!-- Display pagination information -->
    <span class="font-semibold text-gray-900 dark:text-white">
      {$helper.start}
    </span>
    {" - "}
    <span class="font-semibold text-gray-900 dark:text-white">
      {$helper.end}
    </span>
    {" of over "}
    <span class="font-semibold text-gray-900 dark:text-white">
      {$helper.total}
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
