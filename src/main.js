import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

const app = createApp(App);
app.use(PrimeVue);
app.component("PrimeButton", Button);
app.component("PrimeInputText", InputText);
app.component("PrimePassword", Password);

app.mount("#app");
