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

<div class="page-container">
  <div class="content-wrap"></div>
  <Footer class="z-20 w-full">
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between"></div>
    <FooterCopyright href="/" by="CSC648 Team 5™" />
  </Footer>
</div>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 1vh;
  }
  .content-wrap {
    flex: 100;
    padding-bottom: 2rem;
  }
</style>
