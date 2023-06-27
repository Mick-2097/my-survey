<script setup>
import { authData } from '../stores/auth-data'
import Vbutton from '../components/Vbutton.vue'
const auth = authData()
</script>

<template>
  <section>
    <label>
      Email:
      <input type="email" v-model="auth.email" placeholder="Email address" />
    </label>
    <label>
      Password:
      <input type="password" v-model="auth.password" placeholder="Password" />
    </label>
    <div class="wrapper">
      <Vbutton class="button-dark" buttonText="Sign in" @click="auth.login" />
    </div>
    <p>Don't hava an account? <RouterLink to="register">Register here</RouterLink></p>
  </section>
</template>

<style scoped>
p {
  text-align: center;
  margin-top: 2rem;
}
</style>
