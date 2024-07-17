<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import { ref, computed } from "vue";
import { userRegistration, userLogin } from "../api/axiosApi";
import Cookies from 'cookies';

const username = ref("");
const password = ref("");
const isLoginDisabled = computed(() => !username.value || !password.value);

const isAuthenticated = ref(false);
const usernameState = ref("");

const handleRegister = async () => {
  console.log("Registering user...");
  const data = {
    username: username.value,
    password: password.value
  };
  try {
    const response = await userRegistration(data);
    console.log(response);
    alert("Registration successful!");
  } catch (error) {
    console.error(error.message);
    alert("Registration failed!", error.message);
  }
};  

const handleLogin = async () => {
  console.log("Logging in user...");
  const data = {
    username: username.value,
    password: password.value
  };
  try {
    const response = await userLogin(data);
    console.log(response);
    alert("Login successful!");
  } catch (error) {
    console.error(error.message);
    alert("Login failed!", error.message);
  }
};

const handleLogout = () => {
  Cookies.remove('token');
  isAuthenticated.value = false;
  usernameState.value = "";
  alert("Logout successful");
};
</script>

<template>
  <div v-if="!isAuthenticated" class="custom-placeholder flex flex-column row-gap-4 w-80">
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText v-model="username" id="username" class="pl-2" />
        <label for="username">Username</label>
      </FloatLabel>
    </InputGroup>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-lock"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText v-model="password" type="password" id="password" />
        <label for="password">Password</label>
      </FloatLabel>
    </InputGroup>

    <div class="flex gap-2 h-11">
      <Button label="Login" class="w-full" :disabled="isLoginDisabled" @click="handleLogin"></Button>
      <Button icon="pi pi-user-plus" @click="handleRegister"></Button>
      
    </div>
    <Button class="absolute top-10 right-10" icon="pi pi-sign-out" @click="handleLogout" />
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}
.field {
  margin-bottom: 1em;
}
</style>
