<script setup>
import { dataStore } from '../stores/data-store'
import { authData } from '../stores/auth-data'
import Vbutton from '../components/Vbutton.vue'
import Veditor from '../components/Veditor.vue'
import Vaddquestion from '../components/Vaddquestion.vue'
const store = dataStore()
const auth = authData()
</script>

<template>
  <div class="container">
    <section>
      <h2>{{ store.surveyName }}</h2>
      <div class="card" v-for="(item, index) in store.surveyArray" :key="index">
        <h3>{{ item.QuestionContent }}?</h3>
        <div v-if="item.QuestionType === 'Text response'">
          <label>
            <input type="text" />
          </label>
        </div>
        <div v-if="item.QuestionType === 'Multiple choice'" v-for="option in item.Options">
          <label>
            {{ option }}
            <input type="radio" :name="index" />
          </label>
        </div>
        <div v-if="item.QuestionType === 'Multiple answer'" v-for="option in item.Options">
          <label>
            {{ option }}
            <input type="checkbox" />
          </label>
        </div>
        <img
          src="../assets/edit.svg"
          alt="edit button"
          title="edit this question"
          @click="store.openEditor(index)"
        />
      </div>
      <div class="buttons">
        <Vbutton buttonText="Add question" @click="store.openAddQuestion" />
        <Vbutton buttonText="Save survey" @click="store.saveSurvey(auth.UID)" />
        <Vbutton
          buttonText="Delete survey"
          @click="store.deleteSurvey(auth.UID, store.indexToEdit)"
        />
      </div>
    </section>
    <Veditor />
    <Vaddquestion />
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
}
h3 {
  cursor: default;
  margin-bottom: 1rem;
}
img {
  cursor: pointer;
  scale: 50%;
  float: right;
}
.card {
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  outline: 1px solid rgba(0, 0, 0, 0.2);
}
.card:last-of-type {
  margin-bottom: 4rem;
}
</style>
