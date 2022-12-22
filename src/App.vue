<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header class="px-10">
    <Suspense>
      <Navbar />
    </Suspense>
  </header>

  <RouterView class="px-10" />
</template>
