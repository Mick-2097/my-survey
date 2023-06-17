<script setup>
import { authData } from '../stores/auth-data'
const auth = authData()
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
      <button>{{ auth.name }}&nbsp;<img src="../assets/settings.svg" alt="settings icon" /></button>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-accent);
  padding: 0.5rem 1rem;
}
h2 {
  cursor: default;
}
button {
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  min-height: fit-content;
  max-width: 100%;
  overflow: scroll;
  padding: 0.2rem 0.5rem;
}
div:nth-of-type(1) {
  display: none;
}
div:nth-of-type(2) {
  width: 50%;
  display: flex;
  justify-content: center;
}
div:nth-of-type(3) {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}
@media (min-width: 410px) {
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
