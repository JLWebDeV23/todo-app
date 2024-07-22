import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import Lara from "@primevue/themes/lara";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
});
app.use(pinia);
app.use(router);
app.mount("#app");
