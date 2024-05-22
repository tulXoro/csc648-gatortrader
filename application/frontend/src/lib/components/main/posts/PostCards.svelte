<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: PostCards.svelte
*
* Description: Component to display posts in a uniform fashion. 
**************************************************************/ -->
<script lang="ts">
  import { posts, updateTrigger } from "../../../stores/store.js";
  import { get } from "svelte/store";
  import ProductPost from "./ProductPost.svelte";
  import Results from "./Results.svelte";

  let postList = [];
  // let filteredPosts = [];

  // Function to update the post list
  function updatePostList() {
    const allPosts = get(posts); // Get the current value of posts
    postList = allPosts.filter((post) => post.status === "APPROVED");
    if (get(updateTrigger) !== 0) {
      postList = postList.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        if (get(updateTrigger) === 1) {
          return priceB - priceA;
        } else {
          return priceA - priceB;
        }
        console.log("Updated postList:", postList); // For debugging
      });
    }
  }
  // Subscribe to the posts store
  const unsubscribePosts = posts.subscribe(() => {
    console.log("Posts updated");
    updatePostList();
  });
  // Subscribe to the updateTrigger store
  const unsubscribeUpdateTrigger = updateTrigger.subscribe(() => {
    console.log("Update trigger fired");
    updatePostList();
  });

  // Initial update of post list
  updatePostList();
</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
  {#each postList as post}
    <Results />
    <ProductPost {post} />
  {/each}
</div>
