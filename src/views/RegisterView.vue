<script setup>
import { ref, computed } from "vue";
import bcrypt from "bcryptjs";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { userRegistration } from "@/api/axiosApi";
import Button from 'primevue/button';



const username = ref("");
const password = ref("");
const email = ref("");
const isSubmitDisabled = computed(() => !username.value || !password.value || !email.value);


const handleSubmit = async () => {
  console.log("Registering user...");
  const salt = bcrypt.genSaltSync(5);
  const passwordHashed = bcrypt.hashSync(password.value, salt);
  const data = {
    username: username.value,
    password: passwordHashed,
    email: email.value
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
</script>

<template>
  <div
    class="register flex flex-col justify-center items-center space"
  >
    <h1 class="text-6xl green">Register</h1>
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

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-inbox"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText v-model="email" type="email" id="email" />
        <label for="password">Email</label>
      </FloatLabel>
    </InputGroup>

    <Button label="Submit" class="w-full green" :disabled="isSubmitDisabled" @click="handleSubmit">Submit</Button>
  </div>
</template>



<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  flex-direction: column;
  gap: 2em;
}
.field {
  margin-bottom: 1em;
}
</style>
