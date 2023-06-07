<script setup>
import { RouterLink } from 'vue-router'
import Vbutton from '../components/Vbutton.vue'
import Vquestionmulti from '../components/Vquestionmulti.vue';

import { dataStore } from '../stores/data-store'
const store = dataStore()

const props = defineProps({
    ButtonText: String,
})
</script>

<template>
    <section v-if="!store.isSurveySet && !store.isSurveyComplete">
        <label title="A name for your survey">
            Survey title: 
            <input type="text" v-model="store.surveyName">
        </label>
        <label title="Number of questions in your survey">
            Survey length: 
            <input type="number" v-model="store.numberOfQuestions">
        </label>
        <span v-if="!store.isSurveyValid">Please include Survey title</span>
        <Vbutton @click="store.setSurvey" ButtonText="Next"/>
    </section>

    <section v-if="store.isSurveySet && !store.isSurveyComplete">
        <h3>Question {{ store.surveyArray.length + 1}}</h3>
        <label title="Please chose a type for this question">
            Question type
            <select v-model="store.questionType">
                <option value="Multiple choice">Multiple choice</option>
                <option value="Multiple answer">Multiple answer</option>
                <option value="Text response">Text response</option>
            </select>
        </label>

        <!-- Multiple choice -->
        <Vquestionmulti v-if="store.questionType === 'Multiple choice'"/>

        <!-- Multiple answer -->
        <Vquestionmulti v-if="store.questionType === 'Multiple answer'"/>

        <!-- Text response -->
        <div class="wrapper" v-if="store.questionType === 'Text response'">
            <label title="The question you would like to ask"> 
                Question content:
                <input type="text" v-model="store.questionContent">
            </label>
            <Vbutton v-if="!store.isQuestionSet" @click="store.saveQuestion" ButtonText="Next"/>
        </div>
    </section>

    <section v-if="store.isSurveyComplete">
        <RouterLink to="preview">
            <Vbutton ButtonText="Preview"/>
        </RouterLink>
    </section>

</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
}
h3 {
    margin-bottom: 1rem;
}
select {
    padding: 0 1rem;
    border: none;
}
span {
    color: rgb(225, 28, 28);
}
button {
    width: 100%;
}
</style>