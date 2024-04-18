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
<script>
  import { Card, Button } from "flowbite-svelte";
  import { posts } from "../../../stores/store.js";
</script>

<div class="grid grid-cols-5 gap-4">
  <!-- Filter using one APPROVED posts by Admin -->
  {#each $posts.filter((post) => post.status === "APPROVED") as post}
    <Card padding="none">
      <a href="/"
        ><img
          class="object-cover w-full h-64"
          src={`/image/${post.image_file}`}
          alt={post.item_name}
        /></a
      >

      <div class="flex-grow flex flex-col justify-end bg-white">
        <p class="ml-2 mb-2 text-2xl font-black">{post.item_name}</p>
        <p class="mr-2 mb-2 text-3xl font-black" style="text-align: right;">
          ${post.price}
        </p>
        <Button class="text-xl mt-auto">Message</Button>
      </div>
    </Card>
  {/each}
</div>
