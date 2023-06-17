<script setup>
import Vbutton from '../components/Vbutton.vue'
import { useRouter } from 'vue-router'
import { dataStore } from '../stores/data-store'
import { authData } from '../stores/auth-data'
const router = useRouter()
const auth = authData()
const store = dataStore()
const openSurvey = (survey, index) => {
  store.indexToEdit = index
  store.surveyName = survey.name
  store.surveyArray = survey.survey
  router.push('/preview')
}
</script>

<template>
  <section>
    <RouterLink to="build">
      <Vbutton buttonText="Start new"></Vbutton>
    </RouterLink>
    <br />
    <Vbutton buttonText="Show surveys" @click="store.getSurveys(auth.UID)"></Vbutton>
    <br />
    <ul>
      <li v-for="(item, index) in store.mySurveys" :key="index">
        <p>{{ item.name }}</p>
        <div>
          <img
            src="../assets/edit.svg"
            alt="edit button"
            title="edit this question"
            @click="openSurvey(item, index)"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  width: 100%;
  list-style: none;
}
li {
  font-size: large;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--light-text);
}
img {
  cursor: pointer;
  scale: 50%;
}
</style>
