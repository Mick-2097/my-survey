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
    <div class="buttons" v-if="!store.isQuestionSet">
      <Vbutton class="button-dark" @click="store.setQuestion" buttonText="Next" />
      <RouterLink to="my-surveys">
        <Vbutton class="button-light" buttonText="Cancel" />
      </RouterLink>
    </div>
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
    <div class="buttons" v-if="store.isQuestionSet && !store.isAddQuestion">
      <Vbutton class="button-dark" buttonText="Next" @click="store.saveQuestion" />
      <RouterLink to="my-surveys">
        <Vbutton class="button-light" buttonText="Cancel" />
      </RouterLink>
    </div>
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
