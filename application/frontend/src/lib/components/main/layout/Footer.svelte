<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Footer.svelte
*
* Description: Component to display copyright information.
**************************************************************/ -->

<script>
  import { Footer, FooterCopyright } from "flowbite-svelte";
</script>

<div class="bg-gray-100 dark:bg-gray-800 bottom-0">
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center">
      <hr
        class="my-6 border-gray-200 sm:hidden dark:border-gray-700 lg:block"
      />
      <Footer>
        <FooterCopyright href="/" by="CSC648 Team 5™" />
      </Footer>
      <hr
        class="my-6 border-gray-200 sm:hidden dark:border-gray-700 lg:block"
      />
    </div>
  </div>
</div>
