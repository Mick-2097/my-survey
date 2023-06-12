<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  headerText: String
})
</script>

<template>
  <header>
    <RouterLink class="home-button" to="home">Home</RouterLink>
    <h2>{{ headerText }}</h2>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  text-align: center;
  background: var(--light-accent);
  padding: 0.5rem 1rem;
}
h2 {
  cursor: default;
}
.home-button {
  float: left;
  width: fit-content;
}
</style>
