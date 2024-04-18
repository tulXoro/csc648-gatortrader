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
  import Header from "$lib/components/main/layout/Header.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import { Avatar, Tabs, TabItem } from "flowbite-svelte";
  import img from "$lib/assets/image.jpg";
  import PostCards from "$lib/components/main/posts/PostCards.svelte";
</script>

<title>GatorTrader | Dashboard</title>

<Header />
<Nav />
<div class="container mx-auto px-4">
  <div
    class="md:flex md:items-center md:space-x-4 md:rtl:space-x-reverse md:pb-20"
  >
    <Avatar src={img} rounded class="w-20 h-20" />
    <div class="mt-4 md:mt-0 md:flex md:flex-col md:justify-center">
      <div class="text-xl font-medium dark:text-white">Name</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Joined in August 2014
      </div>
    </div>
  </div>
  <div class="mb-8 md:max-w-lg">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua.
    </p>
  </div>
  <Tabs>
    <TabItem open title="Listings">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Profile:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <PostCards />
    </TabItem>
    <TabItem title="Messages">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Settings:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs>
</div>

<Footer />
