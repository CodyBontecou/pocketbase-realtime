<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useProviderStore } from "@/stores/provider";
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject } from "vue";
import { useRouter } from "vue-router";

// Init the store
const userStore = useUserStore();
const providerStore = useProviderStore();

const { setProvider } = providerStore;

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Router composable
const router = useRouter();

const logoutUser = () => {
  // Manual reset because Pinia using the composition API does not support the $reset function
  userStore.clear();
  // Remove the PocketBase token
  $pb?.authStore.clear();
  // Redirect to the login page
  router.push({ path: "/" });
};

const authMethods = await $pb?.collection("users").listAuthMethods();
console.log(authMethods?.authProviders);
const twitchAuth = authMethods?.authProviders.find(
  (provider) => provider.name === "twitch"
);
const redirectUrl = "https://pocketbase-realtime.vercel.app/redirect";
const authUrl = twitchAuth?.authUrl + redirectUrl;
</script>

<template>
  <nav
    class="sticky top-0 flex flex-wrap items-center justify-between py-3 bg-white z-10"
  >
    <div
      class="w-full relative flex justify-between py-1 lg:w-auto lg:static lg:block lg:justify-start"
    >
      <span aria-current="page" class="text-3xl font-extrabold">
        Pocketbase & Vue
      </span>
    </div>
    <div
      class="lg:relative text-xl font-medium lg:flex lg:flex-grow items-center hidden"
    >
      <ul class="flex flex-row list-none ml-auto">
        <li v-if="$pb?.authStore.token" class="pr-5">
          <router-link to="/feed"> Feed </router-link>
        </li>
        <li v-if="$pb?.authStore.token" class="pr-5">
          <router-link to="/dashboard"> Dashboard </router-link>
        </li>
        <li v-if="$pb?.authStore.token" class="pr-5">
          <span @click="logoutUser"> Logout </span>
        </li>
        <li>
          <a :href="authUrl" @click="setProvider(twitchAuth)"
            >Login with Twitch</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
