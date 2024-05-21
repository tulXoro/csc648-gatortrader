<script lang="ts">
  import Header from "$lib/components/main/layout/Header.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import { Avatar } from "flowbite-svelte";
  import img from "$lib/assets/image.jpg";
  import { posts } from "$lib/stores/store.js";
  import Message from "$lib/components/main/popUps/Message.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { searchState } from "$lib/stores/searchStore";
  import { get } from "svelte/store";
  import { formatDistanceToNow } from "date-fns";

  // Define the interface for the product post
  interface ProductPost {
    post_id: number;
    image_file: string;
    item_name: string;
    item_description: string;
    price: number;
    timestamp: string;
    status: string;
  }

  let post: ProductPost | null = null;

  // Get the post details based on the route parameter
  $: {
    const { post_id } = $page.params;
    const foundPost = $posts.find(
      (post: ProductPost) => post.post_id === parseInt(post_id)
    );
    post = foundPost ? foundPost : null;
  }

  // Sync search state with URL
  $: {
    const { selectedCategory, searchQuery } = get(searchState);
    const url = new URL(window.location.href);
    url.searchParams.set("category", selectedCategory.toString());
    url.searchParams.set("search", searchQuery);
    window.history.replaceState({}, "", url.toString());
  }

  // Function to calculate the time difference
  function getTimeDifference(timestamp: string) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }
</script>

<title>GatorTrader | View Post </title>

<!-- <Header />
<Nav /> -->

<!-- Main content -->
<div class="container">
  <!-- Check if post exists -->
  {#if post}
    <!-- Image detail -->
    <div class="image-detail">
      <div class="image-container mb-10">
        <img
          class="object-cover w-full h-64"
          src={`/image/uploads/${post.image_file}`}
          alt={post.item_name}
        />
      </div>

      <!-- Description -->
      <div class="description-container">
        <p class="text-5xl dark:text-black mb-5">Description</p>
        <p>{post.item_description}</p>
      </div>
    </div>
    <!-- Product details -->
    <div class="ml-10">
      <p
        class="text-5xl dark:text-black mb-5"
        style="border-bottom:1px solid grey; padding-bottom: 20px"
      >
        {post.item_name}
      </p>
      <p class="text-3xl dark:text-black mb-3">${post.price}</p>
      <p
        class="text-xl dark:text-black mb-5"
        style="border-bottom:1px solid grey; padding-bottom: 20px"
      >
        Posted: {getTimeDifference(post.timestamp)}
      </p>
      <div
        class="md:flex md:items-center md:space-x-4 md:rtl:space-x-reverse md:pb-20"
        style="padding:15px;"
      >
        <Avatar src={img} rounded class="w-20 h-20" />
        <div class="mt-4 md:mt-0 md:flex md:flex-col md:justify-center">
          <div class="text-xl font-medium dark:text-white">Seller's Name</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Joined in August 2014
          </div>
        </div>
      </div>
      <!-- Message Button -->
      <div>
        <Message />
      </div>
    </div>
  {/if}
</div>

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
