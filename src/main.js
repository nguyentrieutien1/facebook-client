import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import VueCarousel from "@chenfengyuan/vue-carousel";
import "vue-toast-notification/dist/theme-sugar.css";
import "./socket.io.client/instanceSocket";
import VueSilentbox from "vue-silentbox";
const app = createApp(App);
app.use(router);
app.component(VueCarousel.name, VueCarousel);
app.use(VueToast, {
  position: "top-right",
});
app.mount("#app");
