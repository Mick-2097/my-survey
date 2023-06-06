<script setup>
import Vbutton from '../components/Vbutton.vue'

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
            Number of questions: 
            <input type="number" v-model="store.numberOfQuestions">
        </label>
        <span v-if="!store.isSurveyValid">Please include Survey title</span>
        <Vbutton @click="store.setSurvey" ButtonText="Next"></Vbutton>
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

        <div class="wrapper" v-if="store.questionType === 'Multiple choice'">
            <label title="The question you would like to ask"> 
                Question content:
                <input type="text" v-model="store.questionContent">
            </label>
            <label v-if="!store.isQuestionSet" title="The number of choices in your multiple choice question">
                Number of options: 
                <input type="number" v-model="store.numberOfAnswers" @keydown.enter="store.setQuestion">
            </label>
            <span v-if="!store.isQuestionValid"> Please fill in Question content</span>
            <Vbutton v-if="!store.isQuestionSet" @click="store.setQuestion" ButtonText="Next"/>

            <div class="options">
                <div v-if="store.isQuestionSet" v-for="index in store.setAnswersArray" :key="index">
                    <label>
                        option {{ index + 1 }}:
                        <input type="text" v-model="store.answerContentArray[index]">
                    </label>
                </div>
                <Vbutton v-if="store.isQuestionSet" ButtonText="Next" @click="store.saveQuestion"/>
            </div>
        </div>
        <div v-if="store.questionType === 'Multiple answer'"></div>
        <div v-if="store.questionType === 'Text response'"></div>
    </section>
    <section v-if="store.isSurveyComplete">
        <Vbutton ButtonText="Preview"/>
    </section>
</template>

<style scoped>
section,
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    gap: 2rem;
}
label {
    width: 320px;
    display: flex;
    justify-content: space-between;
}
select {
    padding: 0 1rem;
}
.options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
span {
    color: rgb(225, 28, 28);
}
</style>