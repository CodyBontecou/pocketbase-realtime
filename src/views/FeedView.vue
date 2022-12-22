<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject, onMounted, onUnmounted, ref } from "vue";
import IndividualPost from "../components/IndividualPost.vue";

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Local reactive variables
const posts = ref<any[]>([]);

// Get all the user's posts
const getPostList = async () => {
  try {
    const list = await $pb?.collection("posts").getFullList(200, {
      expand: "user",
    });
    if (list) {
      posts.value = list;
    }
  } catch (error) {
    console.log(error);
  }
};

// Subcribe to the posts collection
const subscribeToAllPosts = async () => {
  await $pb?.realtime.subscribe("posts", async function (e) {
    await getPostList();
  });
};

// Unsubscribe from the posts collection
const unsubscribeToAllPosts = async () => {
  await $pb?.realtime.unsubscribe("posts");
};

onMounted(async () => {
  await getPostList();
  await subscribeToAllPosts();
});

onUnmounted(async () => {
  await unsubscribeToAllPosts();
});
</script>

<template>
  <div>
    <h1 class="mb-3 text-2xl">Feed</h1>
    <div class="grid grid-cols-3">
      <div v-for="post in posts" class="col-start-2 col-span-1">
        <IndividualPost :post-data="post" />
      </div>
    </div>
  </div>
</template>
