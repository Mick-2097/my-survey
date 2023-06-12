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
  max-width: 300px;
  margin: 1em 0;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bolder;
  background: var(--mid-accent);
  border: 2px solid var(--mid-accent);
  color: white;
  margin: 0;
  transition: 0.5s;
}
button:hover,
button:active {
  color: var(--mid-accent);
  background: transparent;
  border: 2px solid var(--mid-accent);
  cursor: pointer;
}
</style>
