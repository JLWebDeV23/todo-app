<template>
  <div class="flex flex-column row-gap-4">
    
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <PrimeInputText
        v-model="username"
        placeholder="Username"
        class="w-full"
      />
    </InputGroup>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-lock"></i>
      </InputGroupAddon>
      <PrimePassword v-model="password" placeholder="Password" class="w-full" />
    </InputGroup>
  </div>
</template>

<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { ref } from "vue";
const username = ref("");
const password = ref("");
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}
.field {
  margin-bottom: 1em;
}
</style>
