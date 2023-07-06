<script setup>
const props = defineProps({
  buttonText: String,
  class: String
})
</script>

<template>
  <button type="button" :class="class">{{ buttonText }}</button>
</template>

<style scoped>
button {
  max-width: 100%;
  width: 280px;
  min-width: fit-content;
}
</style>
