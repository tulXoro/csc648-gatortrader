<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: +page.svelte
*
* Description: pages dedicated to registered users only
**************************************************************/ -->
<script>
  import { Avatar, Tabs, TabItem } from "flowbite-svelte";
  import img from "$lib/assets/image.jpg";
  import PostCards from "$lib/components/main/posts/PostCards.svelte";
  import Notification from "$lib/components/main/popUps/Notification.svelte";
  import UserPosts from "$lib/components/main/dashboard/UserPosts.svelte";
</script>

<title>GatorTrader | Dashboard</title>


<div class="container mx-auto px-4">
  <div
    class="md:flex md:items-center md:space-x-4 md:rtl:space-x-reverse md:pb-20"
    style="padding:10px"
  >
    <div class="mt-4 md:mt-0 md:flex md:flex-col md:justify-center">
      <div class="text-xl font-medium dark:text-white">Hi, Name</div>
    </div>
  </div>
  <div class="mb-8 md:max-w-lg"> </div>
  <Tabs>
    <TabItem open title="Posts">
      <p class="text-sm text-gray-500 dark:text-gray-400"></p>
      <UserPosts />
    </TabItem>
    <TabItem title="Messages">
      <p class="text-sm text-gray-500 dark:text-gray-400"></p>
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </TabItem>
  </Tabs>
</div>

<!-- <Footer /> -->
