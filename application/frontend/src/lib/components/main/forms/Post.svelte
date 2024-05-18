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
    P,
    Textarea,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import SignUpPop from "../popUps/SignUpPop.svelte";
  import { goto } from "$app/navigation";

  let title = "";
  let selectedCategory = 0;
  let bookInfo = "";
  let description = "";
  let price = "";
  let image_file: File | null = null;

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
      return !!bookInfo.trim();
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

  // Ensure the event parameter is of the correct type
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      image_file = files[0];
    }
  }

  // Function to handle form submission
  async function handleSubmit() {
    console.log("Form Data:", {
      title,
      selectedCategory,
      bookInfo,
      description,
      price,
      image_file,
    });

    if (!checkRequiredFields()) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    if (!image_file) {
      alert("Please select an image file to upload.");
      return;
    }

    try {
      // Upload image first
      const formData = new FormData();
      formData.append("file", image_file!);
      formData.append("title", title);
      formData.append("categoryId", selectedCategory?.toString());
      formData.append("description", description);
      formData.append("price", price);
      formData.append("bookInfo", bookInfo);

      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Redirect to home page after successful post
      goto("/");

      const responseData = await response.json();
      alert(responseData.message);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(
        "There was an error creating the product post. Please try again later."
      );
    }
  }
</script>

<form method="POST" action="?/create" on:submit|preventDefault>
  <div
    class="mb-10 border border-gray-300 rounded-lg shadow-md w-1/2 mx-auto py-8 sm:px-6 lg:px-8"
  >
    <div class="mb-6">
      <P align="center" size="4xl" height="loose" weight="semibold"
        >Upload Your Post</P
      >
      <Label for="title" class="mb-2 flex text-xl"
        >Title
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
      <Input
        type="text"
        id="title"
        placeholder="Ex. Software Engineering - Best Practices"
        bind:value={title}
        required
      />
    </div>
    <div class="mb-6">
      <Label for="textarea-id" class="mb-2 flex text-xl"
        >Category
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
      <Button
        style="background-color:steelblue; color: white;"
        class="border-primary-700"
      >
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
    {#if selectedCategory === 3}
      <div class="mb-6">
        <Label for="courseNumber" class="mb-2 flex text-xl"
          >Book Information
          <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
        </Label>
        <Input
          type="text"
          id="bookInfo"
          placeholder="Ex. CSC648 Spring 2024 book for html"
          bind:value={bookInfo}
          required
        />
      </div>
    {/if}
    <div class="mb-6">
      <Label for="textarea-id" class="mb-2 flex text-xl"
        >Description
        <p class="text-gray-500 italic text-sm">- Optional</p></Label
      >
      <Textarea
        id="textarea-id"
        placeholder="describe your post... (Please leave contact information for buyers to reach you!)"
        bind:value={description}
        rows="6"
        name="message"
        style="resize: none;"
      />
    </div>
    <div class="mb-6">
      <Label for="price" class="mb-2 flex text-xl"
        >Price
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
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
    <div class="mb-6">
      <Label for="image" class="mb-2 flex text-xl">
        Upload Image
        <p class="text-gray-500 italic text-sm">- Optional</p>
      </Label>
      <input
        type="file"
        id="image"
        accept="image/*"
        required
        on:change={handleFileChange}
      />
    </div>

    <SignUpPop />

    <Button class="w-full mb-3" type="button" on:click={handleSubmit}
      >Submit</Button
    >
    <P
      align="center"
      italic
      size="lg"
      weight="light"
      color="text-gray-500 dark:text-gray-400"
      >Please allow up to 24 hours for post to publish.</P
    >
  </div>
</form>