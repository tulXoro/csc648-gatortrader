<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Carousel.svelte
*
* Description: Component to display recent posts based on 
* Status (APPROVED) and Timestamp (LASTEST).
**************************************************************/ -->

<script>
  import { Card, Button, Heading, P, Span } from "flowbite-svelte";
  import { posts } from "../../../stores/store.js";
  import { CaretLeftOutline, CaretRightOutline } from "flowbite-svelte-icons";
  import Message from "../popUps/Message.svelte";
  import Results from "./Results.svelte";

  // Filter and sort posts
  $: filteredPosts = $posts
    .filter((post) => post.status === "APPROVED")
    .sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();
      return timestampB - timestampA; // Sort by timestamp descending
    });

  let currentIndex = 0;
  const itemsPerPage = 5;

  // scroll buttons
  function handleNext() {
    currentIndex = Math.min(
      currentIndex + itemsPerPage,
      filteredPosts.length - itemsPerPage
    );
  }

  function handlePrev() {
    currentIndex = Math.max(currentIndex - itemsPerPage, 0);
  }

  let isButtonClicked = false;

  function handleClick() {
    isButtonClicked = true;
  }
</script>

<Heading tag="h1" class="mb-5" align="center">
  The marketplace for <Span highlight>SFSU</Span>. Buy and sell locally.
</Heading>

<div class="carousel-container relative">
  <P align="left" weight="bold" size="2xl">Recent Posts</P>
  <Results />
  <div
    class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 relative overflow-hidden"
  >
    {#each filteredPosts.slice(currentIndex, currentIndex + itemsPerPage) as post}
      <Card padding="none">
        <a href="/viewPost" target="_blank"
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

          {#if isButtonClicked}
            <div>
              <Message />
            </div>
          {/if}
          {#if !isButtonClicked}
            <Button class="text-xl mt-auto" on:click={handleClick}
              >Message</Button
            >
          {/if}
        </div>
      </Card>
    {/each}
  </div>
  <Button
    pill={true}
    on:click={handlePrev}
    class="absolute left-0 transform -translate-y-1/2 bg-red-300/50 "
    ><CaretLeftOutline class="w-4 h-4" /></Button
  >
  <Button
    pill={true}
    on:click={handleNext}
    class="absolute right-0 transform -translate-y-1/2 bg-red-300/50"
    ><CaretRightOutline class="w-4 h-4" /></Button
  >
</div>

<style>
  .carousel-container {
    width: auto;
    background-color: #ccc;
    padding: 20px;
    margin-bottom: 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
