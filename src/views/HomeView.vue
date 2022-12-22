<script setup lang="ts">
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
</script>

<template>
  <div>
    <h1 class="mb-12 text-2xl">Login page</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Login />
      </div>
      <div>
        <Register />
      </div>
    </div>
  </div>
</template>
