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
<script>
  import { Button, Modal, A, P, Textarea } from "flowbite-svelte";
  export let post; // Add this line to receive the post data

  let formModal = false;
  let message = "";

  // TEST ONLY
  function handleSubmit() {
    console.log("Submitted message in Message Modal:", message);
  }

  function handleClose() {
    formModal = false;
  }
</script>

<Button
  on:click={() => (formModal = true)}
  class="w-full text-lg mb-3"
  style="background-color:steelblue; color: white;">Message</Button
>

<Modal bind:open={formModal} size="sm" autoclose={false}>
  <div class="justify-center">
    <P align="center" size="3xl" weight="semibold" class="mb-6"
      >{post.item_name}</P
    >
    <div class="message-detail">
      <div class="flex mb-10">
        <div class="w-32 h-32 flex-shrink-0">
          <img
            class="object-cover w-full h-full"
            src={`/image/thumbnails/${post.image_file}`}
            alt={post.item_name}
          />
        </div>
        <div class="flex-column ml-3">
          <P align="left" size="lg" weight="normal">Price: ${post.price}</P>
        </div>
      </div>

      <div class="mb-6">
        <Textarea
          id="textarea-id"
          placeholder="Please type your message to seller... 
Please include contact info such as email or phone number!"
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
          on:click={handleSubmit}>Send message</Button
        >
      </div>
    </div>
  </div></Modal
>
