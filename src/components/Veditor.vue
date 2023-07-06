<script setup>
import Vbutton from './Vbutton.vue'
import { dataStore } from '../stores/data-store'
const store = dataStore()
</script>

<template>
  <transition name="scale" :duration="600">
    <div
      class="background"
      v-if="store.isEditorShown"
      @click="store.closeEditor"
      @keydown.esc="store.closeEditor"
    >
      <div class="modal" @click.stop>
        <div class="card">
          <h3>Question {{ store.indexToEdit + 1 }}</h3>
          <label
            >Question content:
            <input type="text" v-model="store.surveyArray[store.indexToEdit].QuestionContent" />
          </label>
          <div
            v-if="store.surveyArray[store.indexToEdit].Options"
            v-for="(item, index) in store.surveyArray[store.indexToEdit].Options"
          >
            <label
              >Option {{ index + 1 }}:
              <input type="text" v-model="store.surveyArray[store.indexToEdit].Options[index]" />
            </label>
          </div>
          <div class="buttons">
            <Vbutton class="button-dark" buttonText="Save" @click="store.closeEditor" />
            <Vbutton
              class="button-light"
              buttonText="Delete"
              @click="store.deleteQuestion(store.indexToEdit)"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
