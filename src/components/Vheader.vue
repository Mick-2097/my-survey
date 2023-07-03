<script setup>
import { authData } from '../stores/auth-data'
import { dataStore } from '../stores/data-store'
import Vsettings from './Vsettings.vue'
const auth = authData()
const store = dataStore()
const props = defineProps({
  headerText: String
})
</script>

<template>
  <header>
    <div class="spacer"></div>
    <div>
      <h2>{{ headerText }}</h2>
    </div>
    <div>
      <button v-if="auth.name" @click="store.isSettingsShown = !store.isSettingsShown">
        {{ auth.name }}&nbsp;<img src="../assets/settings.svg" alt="settings icon" />
      </button>
    </div>
  </header>
  <Vsettings class="menu" v-if="store.isSettingsShown" />
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  background: rgb(226, 226, 255);
  padding: 0.5rem 0.1rem;
}
h2 {
  cursor: default;
}
button {
  cursor: pointer;
  font-size: 16px;
  display: flex;
  height: fit-content;
  justify-self: flex-end;
  margin: 0 0.5rem 0 auto;
  padding: 0.2rem 0.5rem;
}
header > div:nth-of-type(1) .spacer {
  display: none;
}
header > div:nth-of-type(2) {
  margin-right: auto;
  width: 50%;
  display: flex;
  justify-content: center;
}
header > div:nth-of-type(3) {
  width: 30%;
  display: flex;
  justify-content: flex-end;
}
@media (min-width: 410px) {
  header {
    padding: 0.5rem;
  }
  div:nth-of-type(1) .spacer {
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }
  div:nth-of-type(2) {
    width: 40%;
  }
  div:nth-of-type(3) {
    width: 30%;
  }
}
</style>
