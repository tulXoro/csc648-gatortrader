<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Filter.svelte
*
* Description: Component will be a sidebar with togglable filter buttons.
**************************************************************/ -->
<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Range, Label, Checkbox } from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, CartSolid, MailBoxSolid, UserSolid, ArrowRightToBracketOutline, EditOutline } from 'flowbite-svelte-icons';
    let spanClass = 'flex-1 ms-3 whitespace-nowrap';
    let stepValue = 2.5;
  </script>

<div class="rounded border border-gray-200 dark:border-gray-700" style="padding-bottom:10px">
    <Label>Price Range</Label>
    <Checkbox>Under $20</Checkbox>
    <Checkbox>$20 to $50</Checkbox>
    <Checkbox>Over $50</Checkbox>
</div>

<div class="rounded border border-gray-200 dark:border-gray-700" style="padding-bottom:10px">
    <Label>Post Date</Label>
    <Checkbox>Less than 3 days ago</Checkbox>
    <Checkbox>3 days to 2 weeks</Checkbox>
    <Checkbox>Over 2 weeks</Checkbox>
</div>

<!-- <Range id="range-steps" min="0" max="9999" bind:value={stepValue} step="0.25" />
<p>Value: {stepValue}</p> -->
<!--   
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard">
          <svelte:fragment slot="icon">
            <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
            
        </SidebarItem>
        <SidebarItem label="Price">
            <Range id="range-steps" min="0" max="9999" bind:value={stepValue} step="0.25" />
            <p>Value: {stepValue}</p>
        </SidebarItem>
     
      
       
  
        
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar> -->