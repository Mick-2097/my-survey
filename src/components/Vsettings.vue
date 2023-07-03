<script setup>
import { authData } from '../stores/auth-data'
import { dataStore } from '../stores/data-store'
const auth = authData()
const store = dataStore()

const logout = () => {
  auth.logOut()
  store.isSettingsShown = false
}
</script>

<template>
  <div class="settings">
    <RouterLink :to="{ path: '/home' }">
      <button @click="store.isSettingsShown = false" class="about">Home</button>
    </RouterLink>
    <button @click="store.isSettingsShown = false">Account</button>
    <button @click="logout">Log out</button>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 30%;
  max-width: 200px;
  padding: 1rem;
  background-color: rgb(226, 226, 255);
  border-top: none;
  border-radius: 0 0 8px 8px;
  position: fixed;
  right: 0;
}
.about {
  cursor: pointer;
  width: 100%;
}
button {
  cursor: pointer;
  padding: 0.2rem 0;
}
</style>
