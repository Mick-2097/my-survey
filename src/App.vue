<script setup>
import { RouterView } from 'vue-router'
import Vheader from './components/Vheader.vue'
</script>

<template>
  <header>
    <Vheader headerText="My survey" />
  </header>
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style scoped>
header {
  width: 100%;
  margin-bottom: 4rem;
}
</style>
