<script setup>
import { authData } from '../stores/auth-data'
import Vbutton from '../components/Vbutton.vue'
const auth = authData()
</script>

<template>
  <section @keydown.enter="auth.login">
    <label>
      Email:
      <input type="email" v-model="auth.email" placeholder="Email address" />
    </label>
    <label>
      Password:
      <input type="password" v-model="auth.password" placeholder="Password" />
    </label>
    <span v-if="auth.isError">Please check your details and try again</span>
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
span {
  text-align: center;
}
</style>
