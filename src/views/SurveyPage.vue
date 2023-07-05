<script setup>
import Vbutton from '../components/Vbutton.vue'
import { fireBase } from '../stores/fire-base'
import { ref } from 'vue'
const fire = fireBase()
const UID = window.location.pathname.split('/')[1]
const SID = window.location.pathname.split('/')[2]
const responseArray = ref([])
const result = ref([])
const isResultValid = ref(true)
const thanks = ref(false)

const copyURL = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      alert('URL copied to clipboard')
    })
    .catch((err) => {
      alert('Failed to copy URL to clipboard:', err)
    })
}
const currentDate = new Date()
const options = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
}
const formattedDateTime = currentDate.toLocaleString('en-AU', options).replace(/\//g, '-')

fire.getDynamicSurvey(UID, SID, (value) => {
  responseArray.value = Array(value.survey.length).fill([])
})
const setResult = () => {
  isResultValid.value = responseArray.value.every((response) => {
    if (Array.isArray(response)) {
      return response.length !== 0
    } else {
      return response !== '' && response.length !== 0
    }
  })
  if (isResultValid.value) {
    result.value = fire.dynamicSurvey.survey.map((item, index) => {
      let answer
      if (item.QuestionType === 'Text response') {
        answer = responseArray.value[index]
      }
      if (item.QuestionType === 'Multiple choice') {
        answer = responseArray.value[index]
      }
      if (item.QuestionType === 'Multiple answer') {
        answer = [...responseArray.value[index]]
      }
      return {
        question: String(item.QuestionContent),
        type: String(item.QuestionType),
        answer: answer
      }
    })
    fire.saveResult(UID, SID, formattedDateTime, result.value)
    thanks.value = true
  }
}
</script>

<template>
  <section v-if="!thanks">
    <div class="heading">
      <h2>{{ fire.dynamicSurvey.name }}</h2>
    </div>
    <div class="container">
      <div class="card" v-for="(item, index) in fire.dynamicSurvey.survey" :key="index">
        <h3>{{ index + 1 }}. {{ item.QuestionContent }}?</h3>
        <div v-if="item.QuestionType === 'Text response'">
          <label>
            <input type="text" v-model="responseArray[index]" />
          </label>
        </div>
        <div
          v-if="item.QuestionType === 'Multiple choice'"
          v-for="option in item.Options"
          :key="index"
        >
          <label>
            {{ option }}
            <input
              type="radio"
              :value="option"
              :name="item.QuestionContent"
              v-model="responseArray[index]"
            />
          </label>
        </div>
        <div v-if="item.QuestionType === 'Multiple answer'" v-for="option in item.Options">
          <label>
            {{ option }}
            <input
              type="checkbox"
              :value="option"
              :name="item.QuestionContent"
              v-model="responseArray[index]"
            />
          </label>
        </div>
      </div>
    </div>
    <span v-if="!isResultValid">Please answer all questions</span>
    <Vbutton class="button-dark" buttonText="Submit" @click="setResult" />
  </section>
  <section v-else class="centered">
    <h2>Thank you!</h2>
    <p>
      If you would like to create your own custom survey, you can
      <RouterLink to="register"> Register here</RouterLink> for free.
    </p>
  </section>
</template>

<style scoped>
h2 {
  flex-grow: 1;
  color: var(--light-text);
}
.share-button {
  cursor: pointer;
  align-self: center;
}
h3 {
  color: var(--light-text);
  margin-bottom: 1rem;
}
.container {
  padding-top: 2rem;
  border-top: 1px solid var(--light-text);
}
p {
  letter-spacing: 1px;
  line-height: 1.6;
}
</style>
