<script setup>
import { authData } from '../stores/auth-data'
import Vbutton from '../components/Vbutton.vue'
const auth = authData()
</script>

<template>
  <section>
    <label>
      Name:
      <input
        type="text"
        v-model="auth.name"
        placeholder="First name"
        maxlength="16"
        title="max length 16 characters"
      />
    </label>
    <label>
      Email:
      <input type="email" v-model="auth.email" placeholder="Email address" />
    </label>
    <label>
      Password:
      <input type="password" v-model="auth.password" placeholder="Password" />
    </label>
    <div class="wrapper">
      <Vbutton class="button-dark" buttonText="Register" @click="auth.registerUser" />
    </div>
    <p>Already hava an account? <RouterLink to="login">Sign in here</RouterLink></p>
  </section>
</template>

<style scoped>
p {
  text-align: center;
  margin-top: 2rem;
}
</style>
