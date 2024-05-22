<script lang="ts">
  import { onMount } from "svelte";
  import { Avatar } from "flowbite-svelte";
  import img from "$lib/assets/ProfilePic.png";
  import { posts } from "$lib/stores/store.js";
  import Message from "$lib/components/main/popUps/Message.svelte";
  import { page } from "$app/stores";
  import { formatDistanceToNow } from "date-fns";

  let post;
  $: isLoading = true;

  onMount(() => {
    const { post_id } = $page.params;
    const params = new URLSearchParams({
      id: post_id,
    });

    fetch(`/getPostById?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        post = data[0];
        isLoading = false;
        console.log(post);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
      });
  });

  // // Get the post details based on the route parameter or localStorage
  // $: {
  //   const { post_id } = $page.params;

  //   fetch(`/getPostById/${post_id}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Server responded with status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       post = data;
  //       isLoading = false;
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch post:", err);
  //     });

  //   // Cleanup function
  // }

  // Function to calculate the time difference
  function getTimeDifference(timestamp: string) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }
</script>

<title>GatorTrader | View Post </title>

{#if isLoading}
  <div>Loading...</div>
{:else if !post}
  <p>Post not Found!</p>
{:else}
  <div class="flex flex-col gap-5 p-5">
    {#if post}
      <div class="flex flex-col lg:flex-row gap-5">
        <!-- Image detail -->
        <div
          class="flex-1 flex flex-col justify-between ml-0 lg:ml-5 mr-5 lg:mr-0"
          style="width: 500px; height: 800px;  padding: 20px;"
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
        <div class="column-layout">
          <!-- Product details -->
          <div
            class="top-div flex-1 flex flex-col justify-between ml-0 lg:ml-5 mr-5 lg:mr-0"
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
              <Avatar
                src={img}
                alt="ProfilePic"
                imgClass="h-30"
                class="rounded-full"
              />
              <div class="mt-4 md:mt-0 flex flex-col justify-center">
                <div class="text-xl font-medium dark:text-white">
                  {post.first_name}
                  {post.last_name}
                </div>
                <div class="text-sm dark:text-white">{post.user_name}</div>
              </div>
            </div>
            <Message {post} />
          </div>
          <!-- Description -->
          <div
            class="bottom-div flex-1 ml-0 lg:ml-5 mr-5 lg:mr-0 mt-5 lg:mt-0"
            style="width: 400px; height: 200px; border: 2px solid #ccc; border-radius: 8px; padding: 20px;"
          >
            <p
              class="text-3xl dark:text-black mb-3 border-b border-gray-300 pb-5"
            >
              Description
            </p>
            <p>{post.item_description}</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
