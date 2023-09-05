import { createApp } from "vue";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from "vue-router";
import Form from "./components/Form.vue";
import NotesList from "./pages/Notes.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: NotesList },
    { path: "/create", component: Form },
    { path: "/edit/:id", component: Form, props: { isEdit: true }},
    { path: "/delete/:id", component: NotesList}
  ],
});

createApp(App).use(router).mount("#app");
