<script setup>
import { useRouter } from 'vue-router'
import { dataStore } from '../stores/data-store'
import { fireBase } from '../stores/fire-base'
import { authData } from '../stores/auth-data'
import Vbutton from '../components/Vbutton.vue'
import Veditor from '../components/Veditor.vue'
import Vaddquestion from '../components/Vaddquestion.vue'
const router = useRouter()
const store = dataStore()
const fire = fireBase()
const auth = authData()
</script>

<template>
  <div class="container">
    <section>
      <div class="heading">
        <textarea
          class="survey-name"
          type="text"
          v-model="store.surveyName"
          title="Click to edit survey title"
        ></textarea>
        <img @click="router.go(-1)" src="../assets/back.svg" alt="back button" />
      </div>
      <div class="card" v-for="(item, index) in store.surveyArray" :key="index">
        <h3>{{ item.QuestionContent }}</h3>
        <div v-if="item.QuestionType === 'Text response'">
          <label>
            <input type="text" disabled />
          </label>
        </div>
        <div v-if="item.QuestionType === 'Multiple choice'" v-for="option in item.Options">
          <label>
            {{ option }}
            <input type="radio" :name="index" disabled />
          </label>
        </div>
        <div v-if="item.QuestionType === 'Multiple answer'" v-for="option in item.Options">
          <label>
            {{ option }}
            <input type="checkbox" disabled />
          </label>
        </div>
        <img
          src="../assets/new-edit.svg"
          alt="edit button"
          title="edit this question"
          @click="store.openEditor(index)"
        />
      </div>
      <div class="buttons">
        <Vbutton buttonText="Add question" class="button-dark" @click="store.openAddQuestion" />
        <Vbutton buttonText="Save survey" class="button-dark" @click="fire.saveSurvey(auth.UID)" />
        <Vbutton
          class="button-light"
          v-if="store.dataIndex"
          buttonText="Delete survey"
          @click="fire.deleteSurvey(auth.UID, store.dataIndex)"
        />
      </div>
    </section>
    <Veditor />
    <Vaddquestion />
  </div>
</template>

<style scoped>
.survey-name {
  text-align: center;
  border: none;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0 1rem;
  font-size: 24px;
  min-height: fit-content;
  resize: none;
}
h2 {
  margin-bottom: 2rem;
}
h3 {
  cursor: default;
  margin-bottom: 1rem;
}
img {
  cursor: pointer;
  float: right;
}
.card:last-of-type {
  margin-bottom: 4rem;
}
</style>
