<!-- This will be the test populated main page -->
<script>
  import {
    Sidebar,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import { slide } from "svelte/transition";

  let isSidebarOpen = false;

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
  function navigate(url) {
    window.location.href = url;
  }
</script>

<!-- Hamburger Menu Icon/Button -->
<button on:click={toggleSidebar} class="hamburger-icon fixed z-20"> ☰ </button>

{#if isSidebarOpen}
  <div transition:slide={{ duration: 300 }} class="fixed-sidebar">
    <Sidebar>
      <SidebarWrapper>
        <SidebarGroup>
          <SidebarItem on:click={() => navigate("/")} label="Home"
          ></SidebarItem>
          <SidebarDropdownWrapper label="Categories">
            <SidebarDropdownItem label="Electronics" />
            <SidebarDropdownItem label="Furniture" />
            <SidebarDropdownItem label="Textbooks" />
            <SidebarDropdownItem label="Tutoring" />
          </SidebarDropdownWrapper>
          <SidebarItem label="Inbox">
            <svelte:fragment slot="subtext">
              <span class="inbox-notification">3</span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem on:click={() => navigate("#")} label="Users"
          ></SidebarItem>
          <SidebarItem on:click={() => navigate("#")} label="Sign In"
          ></SidebarItem>
          <SidebarItem on:click={() => navigate("#")} label="Sign Up"
          ></SidebarItem>
          <SidebarItem on:click={() => navigate("/about")} label="About Us" />
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </div>
{/if}

<style>
  .hamburger-icon {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 50px;
    position: fixed;

    left: 25px; /* Adjust based on your layout */
    z-index: 40; /* Ensure it's above the sidebar */
  }

  .fixed-sidebar {
    position: fixed;
    top: 250px; /* Adjust so the sidebar appears below the hamburger icon */
    left: 30px;
    /* height: calc(100vh - 50px); Adjust the height based on the top value */
    z-index: 20; /* Below the hamburger icon but above other content */
    width: 250px; /* Adjust based on your design */
  }

  .inbox-notification {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    margin-left: 0.75rem;
    width: 0.75rem;
    height: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #3b82f6;
    background-color: #dbeafe;
    border-radius: 9999px;
  }
</style>
