<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Define a writable store for products
  // right now it works like this might change later
  const posts = writable<Post[]>([]); // Explicitly specify the type of posts

  interface Post {
    post_id: number;
    item_name: string;
    item_description: string;
    price: number;
    category: string;
    user_id: number;
    image_file: string;
    status: string;
  }

  let helper = { start: 1, end: 10, total: 0 }; // Initial pagination data

  async function fetchProductData() {
    try {
      const response = await fetch("/getPosts");
      if (response.ok) {
        const data = await response.json();
        // Update the posts store with fetched data to make it accessible for rendering
        posts.set(data);
        // Calculate the total number of "APPROVED" posts
        helper.total = data.filter(
          (post: Post) => post.status === "APPROVED"
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
</script>

<div class="flex flex-col margin-left gap-2">
  <div class="text-sm text-gray-700 dark:text-gray-400">
    Showing
    <span class="font-semibold text-gray-900 dark:text-white"
      >{helper.start}</span
    >
    to
    <span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span
    >
    of
    <span class="font-semibold text-gray-900 dark:text-white"
      >{helper.total}</span
    >
    Posts
  </div>
</div>
