<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    ImagePlaceholder,
    Skeleton,
    TextPlaceholder,
  } from "flowbite-svelte";

  let sidebarOpen = false;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="relative px-8">
  <div class="sidebar bg-gray-100 shadow-md" class:open={sidebarOpen}>
    <NavUl class="py-4">
      <NavLi href="/" active={true}>Home</NavLi>
      <NavLi href="/about">About</NavLi>
      <NavLi href="/docs/components/navbar">Navbar</NavLi>
      <NavLi href="/pricing">Pricing</NavLi>
      <NavLi href="/contact">Contact</NavLi>
    </NavUl>
  </div>
  <div class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <Navbar class="px-2 sm:px-4 py-2.5">
      <NavBrand>
        <img
          src="/images/flowbite-svelte-icon-logo.svg"
          class="me-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span
          class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          >Flowbite</span
        >
      </NavBrand>
      <NavHamburger on:click={toggleSidebar} />
    </Navbar>
  </div>
  <div style="height:300px;" class="overflow-scroll pb-16">
    <Skeleton class="mt-16 mb-8" />
    <ImagePlaceholder class="my-8" />
    <TextPlaceholder class="my-8" />
  </div>
</div>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    z-index: 1000;
    background-color: #ffffff;
    overflow-x: hidden;
    transition: width 0.5s;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }

  .sidebar.open {
    width: 300px;
  }
</style>
