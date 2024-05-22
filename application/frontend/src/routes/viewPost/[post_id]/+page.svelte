<script lang="ts">
  import { Avatar } from "flowbite-svelte";
  import img from "$lib/assets/image.jpg";
  import { posts } from "$lib/stores/store.js";
  import Message from "$lib/components/main/popUps/Message.svelte";
  import { page } from "$app/stores";
  import { formatDistanceToNow } from "date-fns";

  // Define the interface for the product post
  interface ProductPost {
    post_id: number;
    image_file: string;
    item_name: string;
    item_description: string;
    price: number;
    timestamp: string;
    user_name?: string;
  }

  let post: ProductPost | null = null;
  let isLoading = true;

  // Get the post_id from localStorage if available
  const postId = localStorage.getItem("postId");

  // Get the post details based on the route parameter or localStorage
  $: {
    const { post_id } = $page.params;
    const foundPost = $posts.find(
      (post: ProductPost) => post.post_id === parseInt(post_id || postId || "")
    );
    if (foundPost) {
      // If post is found, set loading to false and update post
      isLoading = false;
      post = foundPost;
      // Store the post_id in localStorage for persistence
      localStorage.setItem("postId", String(post_id));
    }
  }

  // Function to calculate the time difference
  function getTimeDifference(timestamp: string) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }
</script>

<title>GatorTrader | View Post </title>

{#if isLoading}
  <div>Loading...</div>
{:else}
  <div class="flex flex-col gap-5 p-5">
    {#if post}
      <div class="flex flex-col lg:flex-row gap-5">
        <!-- Image detail -->
        <div
          class="flex-1 flex flex-col justify-between ml-0 lg:ml-5 mr-5 lg:mr-0"
          style="width: 500px; height: 500px;  padding: 20px;"
        >
          {#if post.image_file}
            <img
              src={`/image/uploads/${post.image_file}`}
              alt={post.item_name}
              class="max-w-full max-h-full object-contain"
            />
          {:else}
            <img
              class="max-w-full max-h-full object-contain"
              src={`/image/no_image.jpg`}
              alt="Stock Image"
            />
          {/if}
        </div>
        <!-- Product details -->
        <div
          class="flex-1 flex flex-col justify-between ml-0 lg:ml-5 mr-5 lg:mr-0"
          style="width: 400px; height: 500px; border: 2px solid #ccc; border-radius: 5px; padding: 20px;"
        >
          <div>
            <p
              class="text-5xl dark:text-black mb-5 border-b border-gray-300 pb-5"
            >
              {post.item_name}
            </p>
            <p class="text-3xl dark:text-black mb-3">${post.price}</p>
            <p
              class="text-xl dark:text-black mb-5 border-b border-gray-300 pb-5"
            >
              Posted: {getTimeDifference(post.timestamp)}
            </p>
          </div>
          <div
            class="flex items-center space-x-4 rtl:space-x-reverse pb-5 mb-5 border-b border-gray-300"
          >
            <Avatar src={img} rounded class="w-20 h-20" />
            <div class="mt-4 md:mt-0 flex flex-col justify-center">
              <div class="text-xl font-medium dark:text-white">Seller</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Joined in August 2014
              </div>
            </div>
          </div>
          <Message {post} />
        </div>
      </div>
      <!-- Description -->
      <div
        class="flex-1 flex flex-col justify-between ml-0 lg:ml-5 mr-5 lg:mr-0 mt-5 lg:mt-0"
        style="width: 1000px; height: 200px; border: 2px solid #ccc; border-radius: 8px; padding: 20px;"
      >
        <p class="text-5xl dark:text-black mb-5">Description</p>
        <p>{post.item_description}</p>
      </div>
    {/if}
  </div>
{/if}
