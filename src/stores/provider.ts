import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

interface AuthProviderInfo {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
}

export const useProviderStore = defineStore("provider", () => {
  const provider = ref(useLocalStorage("provider", {} as AuthProviderInfo));

  const setProvider = (val: AuthProviderInfo | undefined) =>
    (provider.value = val);

  return { provider, setProvider };
});
