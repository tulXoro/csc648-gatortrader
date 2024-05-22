<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Notification.svelte
*
* Description: Component for a Notification pop-up. Will be  
* notifications for messages from buyers to sellers.
**************************************************************/ -->

<script lang="ts">
  import { onMount } from "svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { Alert } from "flowbite-svelte";

  // Define the interface for a Message object
  interface Message {
    senderId: number;
    receiverId: number;
    message: string;
    date: string;
    post_id: number;
    senderUsername: string;
  }

  // Define the interface for a ProductPost object
  interface ProductPost {
    post_id: number;
    image_file: string;
    item_name: string;
    item_description: string;
    price: number;
    timestamp: string;
    user_name?: string;
    category_id?: number;
    first_name?: string;
    last_name?: string;
    status?: string;
    user_id?: number;
  }

  // Array to store the messages
  let messages: Message[] = [];
  // Object to store the posts keyed by post_id
  let posts: Record<number, ProductPost> = {};
  // Variable to store any error message
  let error: string | null = null;

  // Fetch messages and posts when the component mounts
  onMount(async () => {
    try {
      const params = new URLSearchParams({
        credentials: "include",
      });

      // Fetch messages from the server
      const messageResponse = await fetch(`/message?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });

      if (!messageResponse.ok) {
        throw new Error("Failed to fetch messages");
      }

      // Store the fetched messages
      messages = await messageResponse.json();
      console.log("Fetched messages:", messages);

      // Sort messages by date in descending order
      messages.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Fetch post data for each message
      for (const message of messages) {
        if (message.post_id !== undefined) {
          const postResponse = await fetch(
            `/getPostByID?id=${message.post_id}`,
            {
              method: "GET",
            }
          );

          if (!postResponse.ok) {
            throw new Error(`Failed to fetch post with ID: ${message.post_id}`);
          }

          const postData = await postResponse.json();
          console.log(
            `Fetched post data for post_id ${message.post_id}:`,
            postData
          );

          // Handle the case where postData is an array
          if (Array.isArray(postData)) {
            if (postData.length > 0) {
              posts[message.post_id] = postData[0];
            } else {
              console.error(`No post found for post_id ${message.post_id}`);
            }
          } else {
            posts[message.post_id] = postData;
          }

          console.log(
            `Assigned post for post_id ${message.post_id}:`,
            posts[message.post_id]
          );
        } else {
          console.error("Skipping fetch for undefined post_id:", message);
        }
      }

      console.log("Fetched posts:", posts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      error = err.message;
    }
  });
</script>

<!-- Template to render notifications -->
{#if error}
  <!-- Display error message if there is an error -->
  <Alert color="red" dismissable class="alert-border">
    <div class="alert-content">
      <InfoCircleSolid slot="icon" class="w-5 h-5 text-red-500" />
      <span>{error}</span>
    </div>
  </Alert>
{:else if messages.length === 0}
  <!-- Display message if there are no messages -->
  <Alert color="blue" dismissable class="alert-border">
    <div class="alert-content">
      <InfoCircleSolid slot="icon" class="w-5 h-5 text-blue-500" />
      <span>No messages to display.</span>
    </div>
  </Alert>
{:else}
  <!-- Display messages if there are any -->
  {#each messages as message}
    <div class="alert-border">
      <div class="alert-header">
        Message from {message.senderUsername}
      </div>
      <div class="alert-content">
        <div>
          <div>{message.message}</div>
          <!-- Display post details if available -->
          {#if posts[message.post_id]}
            <div class="post-details flex">
              <div class="post-image">
                <img
                  src={`/image/thumbnails/${posts[message.post_id].image_file}`}
                  alt={posts[message.post_id].item_name}
                />
              </div>
              <div class="flex-column ml-3">
                <div class="post-title">{posts[message.post_id].item_name}</div>
                <div class="post-price">
                  Price: ${posts[message.post_id].price}
                </div>
              </div>
            </div>
          {:else}
            <!-- Display loading message if post details are not available yet -->
            <div class="text-gray-500 mt-2">Loading post details...</div>
          {/if}
        </div>
      </div>
    </div>
  {/each}
{/if}

<!-- Styles for the notification component -->
<style>
  .alert-content {
    @apply flex items-start space-x-3;
  }
  .post-details {
    @apply mt-2 text-sm text-gray-700 border-t border-gray-200 pt-2;
  }
  .post-title {
    @apply font-semibold text-lg text-gray-900;
  }
  .post-price {
    @apply text-gray-600;
  }
  .alert-border {
    @apply border border-gray-500 rounded-lg p-4 mb-4 bg-slate-200;
  }
  .alert-header {
    @apply font-bold text-xl text-gray-800 mb-2;
  }
</style>
