<script>
  import { Carousel } from "flowbite-svelte";
  import images from "./assets/image.jpg";
</script>

<div class="max-w-4xl space-y-4">
  <Carousel
    {images}
    imgClass="object-contain h-full w-fit rounded-sm"
    let:Indicators
    let:Controls
    class="rounded-md ring-4 ring-green-500 border-4 border-white dark:border-gray-800 min-h-[320px] bg-gray-200"
  >
    <Indicators class="border border-white rounded-md p-2" />
    <Controls class="items-center text-red-400 dark:text-green-400 pt-4" />
  </Carousel>
</div>
