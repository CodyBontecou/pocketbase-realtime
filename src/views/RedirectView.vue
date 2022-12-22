<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useProviderStore } from "@/stores/provider";
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject, onMounted } from "vue";

const $pb = inject(pocketBaseSymbol);

const route = useRoute();
const router = useRouter();
// parse the query parameters from the redirected url
const queryParams = route.query;

const userStore = useUserStore();
const providerStore = useProviderStore();
// load the previously stored provider's data
const { provider } = providerStore;

console.log(provider.state);
console.log(queryParams.code);

// compare the redirect's state param and the stored provider's one
if (provider.state !== queryParams.state) {
  throw "State parameters don't match.";
}

const redirectUrl =
  "https://6174-2603-800c-24f0-8460-5c8d-5452-df00-3d2a.ngrok.io/redirect";

const authUser = async () => {
  try {
    // Authenticate the user via email and password
    const userData = await $pb
      ?.collection("users")
      .authWithOAuth2(
        provider.name,
        queryParams.code,
        provider.codeVerifier,
        redirectUrl
      );

    if (userData) {
      console.log(userData);
      console.log($pb);
      userStore.userID = userData.record.id;
      userStore.username = userData.record.profile?.username;
      userStore.userProfileID = userData.record.profile?.id!;
      router.push({ path: "/dashboard" });
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await authUser();
});
</script>

<template>
  <h1>Redirect</h1>
</template>
