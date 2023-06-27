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
  width: 280px;
}

@media (min-width: 520px) {
  button {
    width: fit-content;
  }
}
</style>
