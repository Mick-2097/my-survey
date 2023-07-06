<script setup>
import { authData } from '../stores/auth-data'
import { dataStore } from '../stores/data-store'
import Vbutton from '../components/Vbutton.vue'
const auth = authData()
const store = dataStore()
const update = () => {
  auth.updateName()
  store.isAccountShown = false
}
</script>

<template>
  <transition name="scale" :duration="600">
    <div class="background" v-if="store.isAccountShown">
      <div class="modal">
        <label>Name: <input type="text" v-model="auth.name" /></label>
        <div class="buttons">
          <Vbutton @click="update" buttonText="Update" class="button-dark" />
          <Vbutton @click="store.isAccountShown = false" buttonText="Close" class="button-dark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped></style>
