<script setup>
const props = defineProps({
    HeaderText: String
})
</script>

<template>
    <section>
        <h2>{{ HeaderText }}</h2>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    text-align: center;
    background: var(--accent-color);
    padding: 0.5rem 1rem;
}
h2 {
    cursor: default;
}
</style>