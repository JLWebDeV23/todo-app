import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("currentUser", () => {
  const username = ref("");
  const setUsername = (name) => {
    username.value = name;
  };

  return {
    username: username.value,
    setUsername,
  };
});
