import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app"
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCN7Xo_8uJnHr4LZKi0rs7yMTCRITvD5_Y",
  authDomain: "my-survey-6cf05.firebaseapp.com",
  databaseURL: "https://my-survey-6cf05-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-survey-6cf05",
  storageBucket: "my-survey-6cf05.appspot.com",
  messagingSenderId: "872229248906",
  appId: "1:872229248906:web:7605472b556aac47ffb273",
  measurementId: "G-L9GWZY0844"
}

initializeApp(firebaseConfig)