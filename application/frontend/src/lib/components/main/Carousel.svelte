<script>
  import { Gallery } from "flowbite-svelte";
  const images1 = [
    {
      alt: "shoes",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    },
    {
      alt: "small bag",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    },
    {
      alt: "plants",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    },
    {
      alt: "watch",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    },
    {
      alt: "shoe",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    },
  ];
</script>

<Gallery class="gap-4">
  <Gallery class="grid-cols-5" items={images1} />
</Gallery>
