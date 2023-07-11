<script setup>
import { RouterLink } from 'vue-router'
import Vbutton from '../components/Vbutton.vue'
import Vquestionmulti from '../components/Vquestionmulti.vue'
import { dataStore } from '../stores/data-store'
const store = dataStore()
</script>

<template>
  <div class="container">
    <section v-if="!store.isSurveySet && !store.isSurveyComplete">
      <label title="A name for your survey">
        Survey title:
        <input type="text" v-model="store.surveyName" />
      </label>
      <span v-if="!store.isSurveyValid && !store.surveyName">Please include Survey title</span>
      <div class="buttons">
        <Vbutton class="button-dark" @click="store.setSurvey" buttonText="Next" />
        <RouterLink to="my-surveys">
          <Vbutton class="button-light" v-if="!store.isQuestionSet" buttonText="Cancel" />
        </RouterLink>
      </div>
    </section>
    <section v-if="store.isSurveySet && !store.isSurveyComplete">
      <h3>Question {{ store.surveyArray.length + 1 }}</h3>
      <label title="Please chose a type for this question">
        Question type:
        <select v-model="store.questionType">
          <option
            value="Multiple choice"
            title=" A multiple choice question that recieves a single answer"
          >
            Multiple choice
          </option>
          <option
            value="Multiple answer"
            title="A multiple choice question that can recieve multiple answers"
          >
            Multiple answer
          </option>
          <option value="Text response" title="A question that recieves a unique answer">
            Text response
          </option>
        </select>
      </label>
      <RouterLink to="preview" v-if="store.surveyArray.length && !store.questionType">
        <Vbutton class="button-dark preview-button" buttonText="Preview" />
      </RouterLink>
      <Vquestionmulti v-if="store.questionType === 'Multiple choice'" />
      <Vquestionmulti v-if="store.questionType === 'Multiple answer'" />
      <div class="wrapper" v-if="store.questionType === 'Text response'">
        <label title="The question you would like to ask Do not include a question mark">
          Question content:
          <input type="text" v-model="store.questionContent" />
        </label>
        <span v-if="!store.isQuestionValid"> Please fill in Question content</span>
        <div class="buttons" v-if="!store.isQuestionSet">
          <Vbutton class="button-dark" @click="store.setQuestion" buttonText="Add question" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 1rem;
}
span {
  color: rgb(225, 28, 28);
}
.preview-button {
  margin-top: 3rem;
}
</style>
