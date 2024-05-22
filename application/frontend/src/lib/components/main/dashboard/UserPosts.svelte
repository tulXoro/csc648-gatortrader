<script>
  import { onMount } from "svelte";
  import ProductPost from "$lib/components/main/posts/ProductPost.svelte";

  let posts = [];

  onMount(() => {
    const params = new URLSearchParams({
      credentials: "include",
    });

    fetch(`/getSellerPosts?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        posts = data;
        console.log(posts);
        // posts = data.sort((a, b) => {
        //   const timestampA = new Date(a.timestamp).getTime();
        //   const timestampB = new Date(b.timestamp).getTime();
        //   return timestampB - timestampA;
        // });
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  });
</script>

<div>
  {#if posts.length === 0}
    <p class="text-center text-gray-500 dark:text-gray-400">No posts found</p>
  {:else}
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {#each posts as post}
        <ProductPost {post} isDashboard={true} />
      {/each}
    </div>
  {/if}
</div>
