<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Define a writable store for products
  const posts = writable([]);

  let helper = { start: 1, end: 10, total: 0 }; // Initial pagination data

  async function fetchProductData() {
    try {
      const response = await fetch("/getPosts");
      if (response.ok) {
        const data = await response.json();
        // Update the posts store with fetched data to make it accessible for rendering
        posts.set(data);
        // Update helper.total with the length of posts
        helper.total = data.length;
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
    Showing <span class="font-semibold text-gray-900 dark:text-white"
      >{helper.start}</span
    >
    to
    <span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span
    >
    of
    <span class="font-semibold text-gray-900 dark:text-white"
      >{helper.total}</span
    > Posts
  </div>

  <!-- Check if posts exists and has items -->
  <!-- {#if $posts && $posts.length > 0}
    {(helper.total = $posts.length)}
  {/if} -->
</div>
