<script setup>
import Vbutton from './Vbutton.vue'
import { dataStore } from '../stores/data-store'
const store = dataStore()
</script>
<template>
  <div class="wrapper">
    <label title="The question you would like to ask">
      Question content:
      <input type="text" v-model="store.questionContent" />
    </label>
    <label
      v-if="!store.isQuestionSet"
      title="The number of choices in your multiple choice question"
    >
      Number of options:
      <input type="number" v-model="store.numberOfAnswers" @keydown.enter="store.setQuestion" />
    </label>
    <span v-if="!store.isQuestionValid"> Please fill in Question content</span>
    <Vbutton v-if="!store.isQuestionSet" @click="store.setQuestion" buttonText="Next" />
    <div
      class="options"
      v-if="store.isQuestionSet"
      v-for="index in store.setAnswersArray"
      :key="index"
    >
      <label title="An available answer">
        Option {{ index + 1 }}:
        <input type="text" v-model="store.answerContentArray[index]" />
      </label>
    </div>
    <span v-if="!store.isAnswerValid">Please complete all options</span>
    <Vbutton
      v-if="store.isQuestionSet && !store.isAddQuestion"
      buttonText="Next"
      @click="store.saveQuestion"
    />
  </div>
</template>

<style scoped>
select {
  padding: 0 1rem;
}
.options {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
