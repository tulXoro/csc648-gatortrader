<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Button,
    Input,
  } from "flowbite-svelte";
</script>

<Navbar class="bg-gray-900 text-white">
  <NavBrand href="/" class="ml-auto mr-10">
    <img src="/SFSU.png" class="me-3 h-6 sm:h-20" alt="SFSU Logo" />
    <span
      class="self-center whitespace-nowrap text-5xl font-semibold dark:text-white"
      >GatorTrader</span
    >
  </NavBrand>

  <div class="hidden md:flex flex-grow items-center">
    <Input
      id="search-navbar"
      class="w-full px-4 py-2 rounded-l-md border-r-0 bg-gray-800 text-white"
      placeholder="Search GatorTrader"
    />

    <Button
      href="/about"
      color="none"
      class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <!-- Include your path data for the icon here -->
      </svg>
    </Button>
    <NavUl>
      <NavLi href="/" class="text-white text-2xl" active={true}>Post</NavLi>
      <NavLi href="/about" class="text-white text-2xl">About</NavLi>
      <NavLi href="/" class="text-white text-2xl">Dashboard</NavLi>
    </NavUl>
  </div>
</Navbar>
