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
  import { Card } from "flowbite-svelte";
  import { posts, updateTrigger } from "../../../stores/store.js";
  import Message from "../popUps/Message.svelte";
  import { get } from "svelte/store";
  
    
  let postList = [];
  // let filteredPosts = [];


  // Function to update the post list
  function updatePostList() {
    const allPosts = get(posts); // Get the current value of posts
    postList = allPosts.filter((post) => post.status === "APPROVED");
    if(get(updateTrigger) !== 0){
    postList = postList.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      if(get(updateTrigger) === 1){
        
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

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Filter using only APPROVED posts by Admin -->
  {#each postList as post}
    <Card padding="none">
      <a href={`/viewPost/${post.post_id}`}>
        <img class="object-cover w-full h-64" src={`/image/thumbnails/${post.image_file}`} alt={post.item_name} />
      </a>

      <div class="flex-grow flex flex-col justify-end bg-white">
        <p class="ml-2 text-2xl font-black">{post.item_name}</p>
        <p class="ml-2 text-lg font-light">{post.item_description}</p>
        <p class="mr-2 mb-2 text-3xl font-black" style="text-align: right;">
          ${post.price}
        </p>

        <Message />
      </div>
    </Card>
  {/each}
</div>