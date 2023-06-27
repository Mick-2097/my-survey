<script setup>
import { RouterLink } from 'vue-router'
import Vbutton from '../components/Vbutton.vue'
import { authData } from '../stores/auth-data'

const auth = authData()
</script>

<template>
  <section>
    <RouterLink to="my-surveys">
      <Vbutton class="button-dark" buttonText="Get started" />
    </RouterLink>
    <h3>About this app</h3>
    <p>
      My survey was designed to provide individuals who wish to gather information, opinions, or
      preferences with the chance to create a personalised survey in their preferred format.
      <br /><br />
      Multiple choice, multiple answer and custom answer inputs are all available in the survey
      builder, enabling you to completely customise the type of questions you'd like to ask and the
      type of answers you receive in any survey you create.
      <br /><br />
      Click the button above to get started on your own custom survey.
    </p>
  </section>
</template>

<style scoped>
.no-shadow {
  box-shadow: none;
}
a {
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-bottom: 2rem;
}
h3 {
  text-decoration: underline;
  cursor: default;
  font-size: 22px;
  margin-bottom: 1rem;
}
p {
  cursor: default;
  text-indent: 3ch;
  line-height: 1.5;
  max-width: 420px;
  color: var(--light-text);
  padding: 0 1em;
  font-size: 18px;
}
</style>
