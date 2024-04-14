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
<div>
  <div class="flex items-center space-x-4 rtl:space-x-reverse">
    <Avatar src={img} rounded />
    <div class="space-y-1 font-medium dark:text-white">
      <div>Jese Leos</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Joined in August 2014
      </div>
    </div>
  </div>
  <div>
    <p>Description</p>
  </div>
</div>
<Tabs>
  <TabItem open title="Your Posts">
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

<Footer />

<style>
    .dashboard-profile{
        width: 800px;
        padding: 20px;
    }
  </style>