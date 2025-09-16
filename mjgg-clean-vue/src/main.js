import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");
