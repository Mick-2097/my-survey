<script setup>
import Vbutton from '../components/Vbutton.vue'
import { onMounted } from 'vue'
import { dataStore } from '../stores/data-store'
import { fireBase } from '../stores/fire-base'
import { authData } from '../stores/auth-data'
const store = dataStore()
const fire = fireBase()
const auth = authData()

onMounted(() => {
  store.clearQuestion()
  store.clearSurvey()
  fire.getSurveys(auth.UID)
})
const setRoute = (index) => {
  store.dynamicRoute = `${auth.UID}/${index}`
}
</script>

<template>
  <section>
    <RouterLink to="build">
      <Vbutton class="button-dark" @click="store.dataIndex = ''" buttonText="Start new"></Vbutton>
    </RouterLink>
    <ul>
      <li v-for="(item, index) in fire.mySurveys" :key="index">
        <p>{{ item.name }}</p>
        <div class="icons">
          <RouterLink :to="store.dynamicRoute">
            <img
              @click="setRoute(index)"
              src="../assets/survey.svg"
              alt="edit button"
              title="survey page"
            />
          </RouterLink>
          <RouterLink to="results">
            <img
              @click="store.dataIndex = index"
              src="../assets/results.svg"
              alt="see results"
              title="see results"
            />
          </RouterLink>
          <img
            src="../assets/new-edit.svg"
            alt="edit button"
            title="edit this survey"
            @click="store.openSurvey(item, index)"
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
  border-top: 1px solid var(--light-text);
  margin-top: 2rem;
  padding-bottom: 2rem;
}
li {
  color: rgb(140, 140, 140);
  font-weight: bold;
  font-size: large;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--light-text);
}
.icons {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
}
img {
  cursor: pointer;
}
</style>
