<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Message from "../popUps/Message.svelte";
  import { formatDistanceToNow } from "date-fns";
  import { posts } from "$lib/stores/store";

  export let post;
  export let isDashboard = false;
  // Function to calculate the time difference
  function getTimeDifference(timestamp: string) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }
</script>

<Card
  padding="none"
  class="border border-gray-500 rounded-lg overflow-hidden hover:shadow-lg"
  style="background-color:darkgray color: white;"
>

  <div class="p-4 bg-slate-200">
      <a href={`/viewPost/${post.post_id}`}>
    {#if post.image_file}
      <img
        class="object-cover w-full h-64"
        src={`/image/thumbnails/${post.image_file}`}
        alt={post.item_name}
      />
    {:else}
      <!-- Use a stock image -->
      <img
        class="object-cover w-full h-64"
        src={`/image/no_image.jpg`}
        alt="Stock Image"
      />
    {/if}
  </a>
  <a class="no-underline hover:underline border-gray-300 text-orange-600 hover:text-orange-800" href={`/viewPost/${post.post_id}`}>
    <p
      class="text-2xl font-bold mb-2 border-b border-gray-300 pb-5 pt-2"
      style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
    >
      {post.item_name}
    </p>
  </a>

    <p class="text-md font-semibold mb-4 text-ellipsis overflow-hidden"
      style="white-space: nowrap;">
      {post.item_description}
    </p>
    <p class="text-sm text-gray-700 mb-4 border-b border-gray-300 pb-5">
      Posted: {getTimeDifference(post.timestamp)}
    </p>
    {#if isDashboard}
    <p class="text-2xl font-semibold text-left">
      Status:
      {#if post.status === "PENDING"}
        <span class="text-yellow-500">Pending</span>
      {:else if post.status === "APPROVED"}
        <span class="text-green-500">Approved</span>
      {:else if post.status === "REJECTED"}
        <span class="text-red-500">Rejected</span>
      {:else}
        <span class="text-red-500">Unknown</span>
      {/if}
    </p>
    {/if}
    <p class="text-3xl font-semibold text-right">
      ${post.price}
    </p>
    <div class="grid grid-cols-1"><Message {post} /></div>

  </div>


</Card>
