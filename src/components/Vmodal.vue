<script setup>
import Vbutton from './Vbutton.vue'
import { dataStore } from '../stores/data-store'
const store = dataStore()

</script>

<template>
    <transition name="scale" :duration="1000">
        <div class="background" v-if="store.isModalShown" @click="store.closeEditor">
                <div class="modal" @click.stop>
                    <h3>Question {{ store.indexToEdit + 1 }}</h3>
                    <label>Question content:
                        <input type="text" v-model="store.surveyArray[store.indexToEdit].QuestionContent">
                    </label>
                    <div v-if="store.surveyArray[store.indexToEdit].Options.length"
                    v-for="( item, index ) in store.surveyArray[store.indexToEdit].Options">
                        <label>Option {{ index + 1 }}:
                            <input type="text" v-model="store.surveyArray[store.indexToEdit].Options[index]">
                        </label>
                    </div>
                    <div class="buttons">
                        <Vbutton ButtonText="Save" @click="store.closeEditor"/>
                        <Vbutton Class="button-light" ButtonText="Delete" @click="store.deleteQuestion"/>
                    </div>
                </div>
        </div>
    </transition>
</template>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
}
.modal {
    background-color: white;
    padding: 1rem;
    border: 1px solid var(--light-text);
    outline: 1rem solid white;
    border-radius: 8px;
    width: 320px;
    z-index: 3;
}
h3 {
    margin-bottom: .5rem;
}
button.button-light {
    max-width: 300px;
    margin: 1em 0;
    padding: 0.3rem 1rem;
    border-radius: 6px;
    font-size: 18px;
    font-weight: bolder;
    background: var(--light-text);
    border: 2px solid transparent;
    color: white;
    margin: 0;
    transition: 0.5s;
}
button.button-light:hover,
button:active.button-light {
    color: var(--light-text);
    background: transparent;
    border: 2px solid var(--light-text);
    cursor: pointer;
}

.scale-enter-active {
  transition: transform 0.5s ease-in;
}
.scale-leave-active {
  transition: transform 0.5s ease-in;
  transition-delay: 0.5s;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}

.scale-enter-from .modal,
.scale-leave-to .modal {
  opacity: 0;
}
.scale-enter-active .modal{
  transition: opacity .5s ease-in;
  transition-delay: .5s;
}
.scale-leave-active .modal{
  transition: opacity .5s ease-in;
}
.scale-enter-to .modal,
.scale-leave-from .modal {
    opacity: 1;
}
</style>