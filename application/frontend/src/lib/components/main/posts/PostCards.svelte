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
  import { Card, Button, A } from "flowbite-svelte";
  import { posts } from "../../../stores/store.js";
  import Message from "../popUps/Message.svelte";

  let isButtonClicked = false;

  function handleClick(){
    isButtonClicked = true;
  }

</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
  <!-- Filter using only APPROVED posts by Admin -->
  {#each $posts.filter((post) => post.status === "APPROVED") as post}
    <Card padding="none">
      <!-- <a href={`viewPost/${post.post_id}`} target="_blank"> -->
      <a href="/viewPost" target="_blank">
        <img
          class="object-cover w-full h-64"
          src={`/image/${post.image_file}`}
          alt={post.item_name}
        />
      </a>

      <div class="flex-grow flex flex-col justify-end bg-white">
        <p class="ml-2 mb-2 text-2xl font-black">{post.item_name}</p>
        <p class="mr-2 mb-2 text-3xl font-black" style="text-align: right;">
          ${post.price}
        </p>
        
        {#if isButtonClicked}
          <div>
            <Message/>
          </div>
          {/if}
          {#if !isButtonClicked}
            <Button class="text-xl mt-auto" on:click={handleClick}>Message</Button>
          {/if}
      </div>
    </Card>
  {/each}
</div>
