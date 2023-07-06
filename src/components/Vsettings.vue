<script setup>
import { authData } from '../stores/auth-data'
import { dataStore } from '../stores/data-store'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = authData()
const store = dataStore()

const logout = () => {
  auth.logOut()
  store.isSettingsShown = false
}
const homeClick = () => {
  store.isSettingsShown = false
  router.push('home')
}
const AccountClick = () => {
  store.isSettingsShown = false
  store.isAccountShown = true
}
</script>

<template>
  <div class="settings">
    <RouterLink :to="{ path: '/home' }">
      <button @click="homeClick" class="about">Home</button>
    </RouterLink>
    <button @click="AccountClick">Account</button>
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
  font-size: 14px;
  padding: 0.2rem 0;
  padding: 0.2rem 0.5rem;
  color: var(--mid-accent);
  background: white;
  border: 1px solid var(--mid-accent);
  border-radius: 5px;
  transition: all 400ms ease;
}
button:hover {
  color: white;
  background: var(--mid-accent);
}
</style>
