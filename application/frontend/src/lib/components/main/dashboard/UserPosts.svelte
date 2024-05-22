<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: UserPosts.svelte
*
* Description: Component to display posts belonging to the user
**************************************************************/ -->

<script>
  import { onMount } from "svelte";
  import ProductPost from "$lib/components/main/posts/ProductPost.svelte";

  let posts = []; // Initialize an empty array to store the user's posts

  onMount(() => {
    // Prepare the URL parameters
    const params = new URLSearchParams({
      credentials: "include",
    });

    // Fetch the user's posts from the server
    fetch(`/getSellerPosts?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          // If the response is not ok, throw an error with the status
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json(); // Parse the response as JSON
      })
      .then((data) => {
        posts = data; // Update the posts array with the fetched data
        console.log(posts); // Log the posts to the console for debugging
      })
      .catch((err) => {
        // Handle any errors that occur during the fetch operation
        console.error("Failed to fetch posts:", err);
      });
  });
</script>

<div>
  {#if posts.length === 0}
    <!-- Display a message if no posts are found -->
    <p class="text-center text-gray-500 dark:text-gray-400">No posts found</p>
  {:else}
    <!-- Display the posts in a responsive grid layout -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {#each posts as post}
        <!-- Render each post using the ProductPost component -->
        <ProductPost {post} isDashboard={true} />
      {/each}
    </div>
  {/if}
</div>
