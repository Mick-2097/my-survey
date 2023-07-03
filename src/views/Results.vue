<script setup>
import { ref } from 'vue'
import { dataStore } from '../stores/data-store'
import { authData } from '../stores/auth-data'
import { fireBase } from '../stores/fire-base'
import { onMounted } from 'vue'
const store = dataStore()
const auth = authData()
const fire = fireBase()
const isResultSelected = ref(false)
const selected = ref({})
onMounted(() => {
  fire.getResults(auth.UID, store.dataIndex)
})
const showResult = (index) => {
  selected.value = fire.myResults[index]
  isResultSelected.value = true
  console.log(selected.value.response)
}
</script>

<template>
  <section>
    <h2 v-if="!isResultSelected" class="responses-heading">Responses</h2>
    <div v-else class="heading">
      <h2>Results</h2>
      <img @click="isResultSelected = false" src="../assets/back.svg" alt="back button" />
    </div>
    <ul v-if="!isResultSelected">
      <li
        class="responses"
        @click="showResult(index)"
        v-if="fire.myResults"
        v-for="(item, index) in fire.myResults"
        :key="index"
      >
        <h3>{{ item.timestamp }}</h3>
      </li>
      <li v-else>
        <p>- No results found -</p>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in selected.response" class="results">
        <h3>{{ item.question }}?</h3>
        <h4 v-if="item.type !== 'Multiple answer'">- {{ item.answer }}</h4>
        <h4 v-else v-for="item in item.answer">- {{ item }}</h4>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.responses-heading {
  padding: 0 0 1rem 0;
  border-bottom: 1px solid var(--light-text);
  margin-bottom: 1rem;
}
.heading {
  border-bottom: 1px solid var(--light-text);
  margin-bottom: 1rem;
}
img {
  cursor: pointer;
}
h2 {
  width: 100%;
  text-align: center;
}
h3 {
  text-align: left;
  margin-bottom: 0.5rem;
}
h4 {
  text-align: left;
  padding: 0 0 0.5rem 4rem;
}
ul {
  list-style: none;
  width: 100%;
  text-align: center;
}
.responses {
  cursor: pointer;
  padding: 0.2rem 0;
  border-bottom: 1px solid var(--light-text);
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  color: var(--light-text);
}
.results {
  color: var(--light-text);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: var(--accent-color);
  padding: 0.2rem 0;
  width: 100%;
}
</style>
