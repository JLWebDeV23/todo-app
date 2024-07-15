<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register">
    <h2>Register</h2>
    <div class="field">
      <PrimeInputText v-model="username" placeholder="Username" />
    </div>
    <div class="field">
      <PrimePassword v-model="password" placeholder="Password" toggleMask />
    </div>
    <div class="field">
        <PrimeButton label="Register" @click="register" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import bcrypt from 'bcryptjs';

const username = ref("");
const password = ref("");
const register = async () => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password.value, salt);
  console.log(hash);
};

</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
.field {
  margin-bottom: 1em;
}
</style>