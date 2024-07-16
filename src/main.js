import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import Aura from "@primevue/themes/aura";

const app = createApp(App);
app.use(PrimeVue, { theme: Aura });
app.use(router);
app.mount("#app");
