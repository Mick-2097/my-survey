<script setup>
import { dataStore } from '../stores/data-store'
import Vbutton from '../components/Vbutton.vue'
const store = dataStore()
</script>

<template>
    <section class="wrapper">
        <h2>{{ store.surveyName }}</h2>
        <div class="outline" v-for="(item, index) in store.surveyArray" :key="index">
            <h3>{{ item.QuestionContent }}?</h3>
            <div v-if="item.QuestionType === 'Text response'">
                <label>
                    <input type="text">
                </label>
            </div>
            <div v-if="item.QuestionType === 'Multiple choice'" v-for="option in item.Options">
                <label> {{ option }}
                    <input type="radio" :name="index">
                </label>
            </div>
            <div v-if="item.QuestionType === 'Multiple answer'" v-for="option in item.Options">
                <label> {{ option }}
                    <input type="checkbox">
                </label>
            </div>
            <img src="../assets/edit.svg" alt="edit button" title="edit this question">
        </div>
    </section>
</template>

<style scoped>
h2 {
    margin-bottom: 2rem;
}
h3 {
    cursor: default;
    margin-bottom: 1rem;
}
input[type=text] {
    width: 100%;
}
img {
    cursor: pointer;
    scale: 50%;
    float: right;
}
.outline {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    outline: 1px solid rgba(0, 0, 0, 0.2);
}
.outline:last-of-type {
    margin-bottom: 4rem;
}
</style>