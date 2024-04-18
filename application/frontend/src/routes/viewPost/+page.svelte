<script>
  import Header from "$lib/components/main/layout/Header.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import { Button, Card } from "flowbite-svelte";
</script>

<title>GatorTrader | View Post</title>

<Header />
<Nav />

<!-- Main content -->
<div class="container">
  <!-- Image detail -->
  <div class="image-detail">
    <div class="image-container mb-10">
      <img src="https://fakeimg.pl/1000x500/?text=Image" alt="image" />
      <div class="additional-photos flex">
        <div class="mt-1 flex mr-2">
          <img src="https://fakeimg.pl/100x100" alt="current image " />
        </div>
        <div class="mt-1 flex mr-2">
          <img src="https://fakeimg.pl/100x100/?text=image 2" alt="image 2" />
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="description-container">
      <p class="text-5xl dark:text-black mb-5">Description</p>

      <p>This will be optional by seller</p>
    </div>
  </div>
  <!-- Product details -->
  <Card>
    <!-- <div class="detail-container"> -->
    <p class="text-5xl dark:text-black mb-5">Title</p>
    <p class="text-3xl dark:text-black mb-3">$XX.XX</p>
    <p class="text-xl dark:text-black mb-5">Posted on: April 17, 2024</p>
    <div class="user-info flex">
      <img
        src="https://fakeimg.pl/100x100/?text=Profile Pic"
        alt="profile-pic"
      />
      <div class="ml-2">
        <p>Username</p>
        <p>Joined: January 1, 2020</p>
      </div>
    </div>

    <!-- Message Button -->
    <Button class="message-button w-full">Message</Button>
  </Card>
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
