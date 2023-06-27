<script setup>
import { dataStore } from '../stores/data-store'
import { authData } from '../stores/auth-data'
import { fireBase } from '../stores/fire-base'
import { onMounted } from 'vue'
const store = dataStore()
const auth = authData()
const fire = fireBase()
onMounted(() => {
  fire.getResults(auth.UID, store.dataIndex)
})
</script>

<template>
  <section>
    <h2>Responses</h2>
    <ul>
      <li v-for="(item, index) in fire.myResults" :key="index">
        <h3>{{ item.timestamp }}</h3>
      </li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-text);
  width: 100%;
  text-align: center;
}
ul {
  list-style: none;
  width: 100%;
  text-align: center;
}
li {
  cursor: pointer;
  color: var(--light-text);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.2rem 0;
  width: 100%;
}
</style>
