<script>
  import { Gallery } from "flowbite-svelte";
  import textbook from "$lib/assets/textbook.png";
</script>

<Gallery class="gap-2 grid-cols-2">
  <img src={textbook} alt="shoes" class="h-auto max-w- rounded-lg" />
  <div
    class="h-auto max-w- rounded-lg flex items-center justify-center text-6xl font-extrabold bg-red-300"
  >
    by Course
  </div>
  <div
    class="h-auto max-w- rounded-lg flex items-center justify-center text-6xl font-extrabold bg-blue-300"
  >
    by Professor
  </div>
  <img alt="plants" src={textbook} class="h-auto max-w- rounded-lg" />
</Gallery>
