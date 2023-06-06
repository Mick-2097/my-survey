<script setup>
import { RouterView } from 'vue-router'
import Vheader from './components/Vheader.vue';
</script>

<template>
  <header>
    <Vheader HeaderText="My survey"/>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>
