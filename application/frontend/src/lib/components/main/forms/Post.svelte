<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Post.svelte
*
* Description: Component to display a form for registration. 
**************************************************************/ -->
<script lang="ts">
  import {
    Input,
    Label,
    Button,
    Checkbox,
    A,
    P,
    Textarea,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import DropBox from "../popUps/DropBox.svelte";
  import SignUpPop from "../popUps/SignUpPop.svelte";

  let title = "";
  let description = "";
  let price = "";
  let selectedCategory = 0;
  let checkboxChecked = false;
  let courseNumber = "";
  let professor = "";

  const categories = [
    { id: 0, label: "Choose one" },
    { id: 1, label: "Electronics" },
    { id: 2, label: "Furniture" },
    { id: 3, label: "Textbooks" },
    { id: 4, label: "Misc." },
  ];
  function updateCategory(id: number) {
    selectedCategory = id;
  }

  // Function to check if all required fields are filled in
  function checkRequiredFields(): boolean {
    // Check if title and price are filled
    if (!title.trim() || !price.trim()) {
      return false;
    }

    // If the selected category is textbooks, also check if courseNumber and professor are filled
    if (selectedCategory === 3) {
      return !!courseNumber.trim() && !!professor.trim();
    }

    // Return true if all required fields are filled for other categories
    return true;
  }

  function handlePriceInput(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value;

    // formatting the price
    inputValue = inputValue.replace(/[^\d.]/g, ""); // numeric
    let [integerPart, fractionalPart] = inputValue.split(".");
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (fractionalPart !== undefined && fractionalPart.length > 2) {
      fractionalPart = fractionalPart.slice(0, 2);
    }

    // Concatenate the integer and fractional parts with the decimal point
    let formattedValue =
      fractionalPart !== undefined
        ? formattedInteger + "." + fractionalPart
        : formattedInteger;

    // Update the input value with the formatted number
    (event.target as HTMLInputElement).value = formattedValue;

    // Update the price variable if needed
    price = formattedValue;
  }

  // Function to handle form submission
  function handleSubmit(): void {
    if (!checkRequiredFields()) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    if (!checkboxChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    console.log("Form submitted successfully!");
  }
</script>

<form method="POST" action="?/create" on:submit|preventDefault>
  <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-6">
      <P align="center" size="3xl" height="loose" weight="semibold"
        >Upload Your Post</P
      >
    </div>
    <div class="mb-6">
      <Label for="title" class="mb-2">Title</Label>
      <Input
        type="text"
        id="title"
        placeholder="Ex. Software Engineering - Best Practices"
        bind:value={title}
        required
      />
    </div>
    <div class="mb-6">
      <Label for="textarea-id" class="mb-2">Description</Label>
      <Textarea
        id="textarea-id"
        placeholder="describe your post... (Please leave contact information for buyers to reach you!)"
        bind:value={description}
        rows="5"
        name="message"
        style="resize: none;"
      />
    </div>
    <div class="grid gap-6 md:grid-cols-2">
      <div class="mb-6">
        <Label for="textarea-id" class="mb-2">Category</Label>
        <Button style="width: auto;" class=" border-primary-700">
          {categories[selectedCategory].label}
          <ChevronDownOutline class="w-2.5 h-2.5 ms-2.5" />
        </Button>
        <Dropdown class="w-40">
          {#each categories as { id, label }}
            <DropdownItem
              on:click={() => {
                updateCategory(id);
              }}
              bind:value={id}
              class={selectedCategory === id ? "underline" : ""}
              style="color: black;"
            >
              {label}
            </DropdownItem>
          {/each}
        </Dropdown>
      </div>
      <div class="mb-6">
        <Label for="price" class="mb-2">Price</Label>
        <Input
          class="w-full md:w-48"
          type="text"
          id="price"
          placeholder="$"
          bind:value={price}
          on:input={handlePriceInput}
          required
        />
      </div>
      {#if selectedCategory === 3}
        <div class="mb-6">
          <Label for="courseNumber" class="mb-2">Course Number</Label>
          <Input
            type="text"
            id="courseNumber"
            placeholder="Ex. CSC648"
            bind:value={courseNumber}
            required
          />
        </div>
        <div class="mb-6">
          <Label for="professor" class="mb-2">Professor</Label>
          <Input
            type="text"
            id="professor"
            placeholder="Ex. Petkovic"
            bind:value={professor}
            required
          />
        </div>
      {/if}
    </div>
    <div class="mb-6">
      <Label for="textarea-id" class="mb-2">Upload Image</Label>
    </div>

    <DropBox />

    <Checkbox class="flex justify-center mb-6" bind:checked={checkboxChecked}>
      I agree with the<A href="#">terms and conditions</A>
    </Checkbox>
    <div class="modal mb-3"><SignUpPop /></div>

    <Button class="w-full mb-3" type="button" on:click={handleSubmit}
      >Submit</Button
    >
    <P
      align="center"
      italic
      size="sm"
      weight="light"
      color="text-gray-500 dark:text-gray-400"
      >Please allow up to 24 hours for post to publish</P
    >
  </div>
</form>

<style>
  .container {
    max-width: 600px;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
