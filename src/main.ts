import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const Pinia = createPinia();

createApp(App).use(Pinia).mount('#app')
