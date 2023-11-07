import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Make sure this is pointing to the file where you are exporting the router
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/styles.css';

// Create a new Vue application and use the router
const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);

app.mount('#app');
