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
  import { posts } from "../../stores/store.js";
</script>

<div class="grid grid-cols-5 gap-4">
  <!-- Filter using one APPROVED posts by Admin -->
  {#each $posts.filter((post) => post.status === "APPROVED") as product}
    <Card class="col-span-1">
      <div class="relative h-full flex flex-col">
        <img
          class="object-cover w-full h-64"
          src={`/image/${product.image_file}`}
          alt={product.item_name}
        />
        <div class="p-4 flex-grow flex flex-col justify-end bg-white">
          <p class="mb-2 text-2xl font-bold">{product.item_name}</p>
          <p class="mb-2 text-">{product.item_description}</p>
          <p class="mb-2 text-xl font-black">${product.price}</p>
          <Button class="text-xl mt-auto">Message</Button>
        </div>
      </div>
    </Card>
  {/each}
</div>
