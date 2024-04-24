<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: +page.svelte
*
* Description: page dedicated to viewing post details when 
* clicked on 
**************************************************************/ -->
<script>
  import Header from "$lib/components/main/layout/Header.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import { Avatar, Button, Card } from "flowbite-svelte";
  import img from "$lib/assets/image.jpg";
  import { posts } from "$lib/stores/store.js";
  import Message from "$lib/components/main/popUps/Message.svelte";

  
  let isButtonClicked = false;

  function handleClick(){
    isButtonClicked = true;
  }

</script>

<title>GatorTrader | View Post </title>

<Header />
<Nav />

<!-- Main content -->
<div class="container">
  <!-- Image detail -->
  <div class="image-detail">
    <div class="image-container mb-10">
      <img src="https://fakeimg.pl/1000x500/?text=Image" alt="image" />
    </div>

    <!-- Description -->
    <div class="description-container">
      <p class="text-5xl dark:text-black mb-5">Description</p>

      <p>This will be optional by seller</p>
    </div>
  </div>
  <!-- Product details -->
  <!-- {#each $posts.filter((post) => post.status === "APPROVED") as post} -->
  <!-- <Card> -->
  <div class="ml-10">
    

    <p class="text-5xl dark:text-black mb-5" style="border-bottom:1px solid grey; padding-bottom: 20px">Title</p>
    <!-- <p class="text-3xl dark:text-black mb-3">${post.price}</p> -->
    <p class="text-3xl dark:text-black mb-3"  style="border-bottom:1px solid grey; padding-bottom: 20px">$XX.XX</p>
    <p class="text-xl dark:text-black mb-5"  style="border-bottom:1px solid grey; padding-bottom: 20px">Posted on: April 17, 2024</p>
    <div
      class="md:flex md:items-center md:space-x-4 md:rtl:space-x-reverse md:pb-20" style="padding:15px;"
    >

    <!-- <p class="text-5xl dark:text-black mb-5">{post.item_name}</p> -->
    <!-- <p class="text-3xl dark:text-black mb-3">${post.price}</p> -->

      <Avatar src={img} rounded class="w-20 h-20" />
      <div class="mt-4 md:mt-0 md:flex md:flex-col md:justify-center">
        <div class="text-xl font-medium dark:text-white">Seller's Name</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Joined in August 2014
        </div>
      </div>
    </div>
    <!-- Message Button -->
    
    {#if isButtonClicked}
    <div>
      <Message/>
    </div>
    {/if}
    {#if !isButtonClicked}
      <Button class="message-button w-full" on:click={handleClick}>Message</Button>
    {/if}
  </div>
  <!-- {/each} -->
</div>

<Footer />

<style>
  .container {
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    position: relative;
    margin-bottom: 20px;
    width: 100%;
  }

  .detail-container {
    padding: 20px;
    margin-left: 100px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
