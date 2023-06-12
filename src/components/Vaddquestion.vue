<script setup>
import { dataStore } from '../stores/data-store'
import Vquestionmulti from './Vquestionmulti.vue'
import Vbutton from './Vbutton.vue'
const store = dataStore()
</script>

<template>
  <transition name="scale" :duration="600">
    <div class="background" v-if="store.isAddQuestion" @click="store.closeAddQuestion">
      <div class="modal" @click.stop>
        <section>
          <label title="Please chose a type for this question">
            Question type:
            <select v-model="store.questionType">
              <option value="Multiple choice">Multiple choice</option>
              <option value="Multiple answer">Multiple answer</option>
              <option value="Text response">Text response</option>
            </select>
          </label>
          <Vquestionmulti v-if="store.questionType === 'Multiple choice'" />
          <Vquestionmulti v-if="store.questionType === 'Multiple answer'" />
          <div class="wrapper" v-if="store.questionType === 'Text response'">
            <label title="The question you would like to ask">
              Question content:
              <input type="text" v-model="store.questionContent" />
            </label>
          </div>
        </section>
        <div class="buttons" v-if="store.isAddQuestion">
          <Vbutton
            v-if="store.isAddQuestion && store.isQuestionSet"
            @click="store.saveQuestion"
            buttonText="Save"
          />
          <Vbutton buttonText="Cancel" @click="store.closeAddQuestion" />
        </div>
      </div>
    </div>
  </transition>
</template>
