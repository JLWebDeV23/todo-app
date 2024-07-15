<template>
  <div class="flex-col">
    <!-- <Register /> -->
    <Login v-if="!userLoggedIn" />
    <Todos v-if="userLoggedIn" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Todos from "./components/Todos.vue";

const userLoggedIn = ref(false);

</script>
