<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import FloatLabel from 'primevue/floatlabel';
import Button from "primevue/button";
import { ref, computed } from "vue";

const username = ref("");
const password = ref("");
const isLoginDisabled = computed(() => !username.value || !password.value); 
</script>

<template>
  <div class="custom-placeholder flex flex-column row-gap-4 w-80">
    <InputGroup class="border rounded w-full">
      <InputGroupAddon class="border">
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText v-model="username" id="username" class="pl-2" />
        <label for="username" >Username</label>
      </FloatLabel>
    </InputGroup>

    <InputGroup class="border rounded w-full">
      <InputGroupAddon class="border">
        <i class="pi pi-lock"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText v-model="password" type="password" id="password" class="pl-2" />
        <label for="password" >Password</label>
      </FloatLabel>
    </InputGroup>

    <Button label="Login" class="w-full" :disabled="isLoginDisabled" />
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
