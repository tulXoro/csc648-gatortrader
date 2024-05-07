<script lang="ts">
  import { onMount } from "svelte";
  import { Dropzone } from "flowbite-svelte";

  let value: File | null = null; // Change type to File or null

  const dropHandle = (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer?.items) {
      [...event.dataTransfer.items].forEach(
        (item: DataTransferItem, i: number) => {
          if (item.kind === "file") {
            const file = item.getAsFile();
            if (file && isFileValid(file)) {
              value = file;
            }
          }
        }
      );
    }
  };

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  fileInput.accept = "image/*"; // Limit file type to images

  const handleFileInputChange = () => {
    const files = fileInput.files;
    if (files) {
      [...files].forEach((file: File, i: number) => {
        if (isFileValid(file)) {
          value = file;
        }
      });
    }
    // Reset file input value to allow selecting the same file again
    fileInput.value = "";
  };

  const isFileValid = (file: File): boolean => {
    const maxSize = 3200000; // Maximum size in bytes (800x400px for PNG, JPG, and GIF)

    if (file.size > maxSize) {
      console.log(`File size exceeds maximum limit: ${file.size}`);
      return false;
    }

    return true;
  };

  const showFiles = (files: File[]) => {
    if (files.length === 1) return files[0].name;
    let concat = "";
    files.forEach((file) => {
      concat += file.name;
      concat += ",";
      concat += " ";
    });

    if (concat.length > 40) concat = concat.slice(0, 40);
    concat += "...";
    return concat;
  };

  onMount(() => {
    document.body.appendChild(fileInput); // Append file input to the document body
    fileInput.addEventListener("change", handleFileInputChange); // Listen for file input changes
  });
</script>

<Dropzone
  id="dropzone"
  on:drop={dropHandle}
  on:dragover={(event) => {
    event.preventDefault();
  }}
  on:click={() => fileInput.click()}
>
  <svg
    aria-hidden="true"
    class="mb-3 w-10 h-10 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    /></svg
  >
  {#if value}
    <p>Uploaded file: {value.name}</p>
  {:else}
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">
      SVG, PNG, JPG or GIF (MAX. 800x400px)
    </p>
  {/if}
</Dropzone>
