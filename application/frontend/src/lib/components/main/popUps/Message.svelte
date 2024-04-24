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

  let formModal = false;

  // will use middleware to auth.js
  let message = "";

  // TEST ONLY
  function handleSubmit() {
    console.log("Submitted message in Message Modal:", message);
  }

  
  let isButtonClicked = true;

  function handleClick(){
    isButtonClicked = false;
  }

  function handleClose() {
    formModal = false;
  }
</script>

<Button class="text-xl mt-auto" style="width: 99%" on:click={() => (formModal = true)}>Message</Button>

<Modal bind:open={formModal} size="sm" autoclose={false}>
  <!-- Method is ? -->
  <div class="justify-center">
    <P align="center" size="3xl" weight="semibold" class="mb-6"
      >Message [Name of Seller]</P
    >
    <div class="message-detail">
      <div class="flex mb-10">
        <!-- Place post_id's img_file -->
        <img
          src="https://fakeimg.pl/80x80/?text=Post Image"
          alt="post-image"
          class="flex"
        />
        <div class="flex-column ml-3">
          <!-- Fetch title and price of post-->
          <P align="left" size="xl" weight="normal">Title</P>
          <P align="left" size="lg" weight="normal">Price: $00.00</P>
        </div>
      </div>

      <div class="mb-6">
        <Textarea
          id="textarea-id"
          placeholder="Please type your message to seller"
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
        <Button type="submit" align="text-right" on:click={handleSubmit}
          >Send message</Button
        >
      </div>
    </div>
  </div></Modal
>
