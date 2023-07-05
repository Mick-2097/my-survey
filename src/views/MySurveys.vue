<script setup>
import Vbutton from '../components/Vbutton.vue'
import { onMounted, ref } from 'vue'
import { dataStore } from '../stores/data-store'
import { fireBase } from '../stores/fire-base'
import { authData } from '../stores/auth-data'
const store = dataStore()
const fire = fireBase()
const auth = authData()
const url = ref('')

const copyURL = (SID) => {
  url.value = `${window.location.origin}/${auth.UID}/${SID}`
  navigator
    .share({
      url: url.value
    })
    .then(() => {
      console.log('shared')
    })
    .catch(() => {
      console.log('share failed')
    })
}

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
              alt="view survey"
              title="survey page"
            />
          </RouterLink>
          <RouterLink to="results">
            <img
              @click="store.dataIndex = index"
              src="../assets/results.svg"
              alt="See results"
              title="see results"
            />
          </RouterLink>
          <img
            src="../assets/new-edit.svg"
            alt="edit button"
            title="Edit this survey"
            @click="store.openSurvey(item, index)"
          />
          <img
            @click="copyURL(index)"
            class="share-button"
            src="../assets/share.svg"
            alt="Share this survey"
            title="Copy a link to this survey"
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
