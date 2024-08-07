<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Message.svelte
*
* Description: Component for a modal message form. The message
* content allow user(s) to send a message to a seller and cancel
* the operation if needed.
**************************************************************/ -->
<script lang="ts">
  import { flashStore } from "$lib/stores/flashStore";
  import { formatDistanceToNow } from "date-fns";
  import { Button, Modal, A, P, Textarea } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let post;
  export let userId;

  let formModal = false;
  let message = "";
  let isLoggedIn = false;

  onMount(async () => {
    try {
      const response = await fetch("/login/status");
      const data = await response.json();
      isLoggedIn = data.isLoggedIn;
      userId = data.userId;
    } catch (error) {
      console.error("Failed to fetch login status:", error);
    }
  });

  // Function to calculate the time difference
  function getTimeDifference(timestamp: string) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }

  async function sendMessage() {
    if (!isLoggedIn) {
      triggerError("You must be logged in to send a message.");
      return;
    }
    if (!message.trim()) {
      triggerError("Message cannot be empty");
      return;
    }

    try {
      const response = await fetch("/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: userId,
          receiver_id: post.user_id,
          message: message,
          post_id: post.post_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      triggerSuccess(responseData.message);
      message = "";
      formModal = false;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      triggerError(
        "There was an error sending the message. Please try again later."
      );
    }
  }

  function handleClose() {
    formModal = false;
  }

  function triggerError(message: string) {
    flashStore.add(message, "error", 5000);
  }
  function triggerSuccess(message: string) {
    flashStore.add(message, "success", 5000);
  }
</script>

<Button
  on:click={() => (formModal = true)}
  class="w-75 text-lg mb-1 bottom-0"
  style="background-color:steelblue; color: white;">Message</Button
>

<Modal bind:open={formModal} size="lg" autoclose={false}>
  <div class="justify-center">
    <P
      align="center"
      size="3xl"
      weight="semibold"
      class="mb-6 rtl:space-x-reverse pb-5 mb-5 border-b border-gray-300"
      >{post.item_name}</P
    >
    <div class="message-detail">
      <div
        class="flex mb-10 rtl:space-x-reverse pb-5 mb-5 border-b border-gray-300"
      >
        <div class="w-32 h-32 flex-shrink-0">
          {#if post.image_file}
            <img
              class="object-cover w-full h-full"
              src={`/image/thumbnails/${post.image_file}`}
              alt={post.item_name}
            />
          {:else}
            <!-- Use a stock image -->
            <img
              class="object-cover w-full h-full"
              src={`/image/no_image.jpg`}
              alt="Stock Image"
            />
          {/if}
        </div>

        <div class="flex-column ml-3">
          <P align="left" size="lg" weight="normal">Price: ${post.price}</P>
          <P align="left" size="sm" weight="normal">
            Posted: {getTimeDifference(post.timestamp)}
          </P>
        </div>
      </div>

      <div class="mb-6">
        <Textarea
          id="textarea-id"
          placeholder="Please type your message to the seller...
Ex. Hi there! I'm interested in purchasing your item.
You can reach me at john.doe@example.com or by phone at +1 (415) 123-4567."
          rows="6"
          name="message"
          bind:value={message}
          style="resize:none"
        />
      </div>
      <!-- Middleware IsLoggedIn  onClick:{} -->
      <div style="display: flex; justify-content: space-between;">
        <A align="text-left" on:click={handleClose}>Cancel</A>
        <!-- on:click will send message from FK -> PK -->
        <Button
          type="submit"
          align="text-right"
          style="background-color:steelblue; color: white;"
          on:click={sendMessage}>Send message</Button
        >
      </div>
    </div>
  </div></Modal
>
