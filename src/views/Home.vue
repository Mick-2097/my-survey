<script setup>
import { RouterLink } from 'vue-router'
import Vbutton from '../components/Vbutton.vue'

</script>

<template>
    <section>
        <RouterLink to="build">
            <Vbutton ButtonText="Get started"/>
        </RouterLink>
        <h3>About this app</h3>
        <p>
            My survey was designed to provide individuals who wish to gather information, opinions, or preferences with the chance to create a personalised survey in their preferred format.
            <br><br>
            Multiple choice, multiple answer and custom answer inputs are all available in the survey builder, enabling you to completely customise the type of questions you'd like to ask and the type of answers you receive in any survey you create.
            <br><br>
            Click the button above to get started on your own custom survey.
        </p>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    gap: 2rem;
}
a {
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: center;
    text-decoration: none;
}
h3 {
    text-decoration: underline;
    cursor: default;
    font-size: 22px;
}
p {
    text-indent: 3ch;
    line-height: 1.5;
    width: 35ch;
    max-width: 290px;
    color: var(--light-text);
    padding: 0 1em;
    font-size: 18px;
}
</style>
