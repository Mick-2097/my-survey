<script setup>
const props = defineProps({
    HeaderText: String
})
</script>

<template>
    <header>
        <h2>{{ HeaderText }}</h2>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    text-align: center;
    background: var(--accent-color);
    padding: 0.5rem 1rem;
}
h2 {
    cursor: default;
}
</style>