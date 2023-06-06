import { ref } from 'vue'
import { defineStore } from 'pinia'
export const dataStore = defineStore('data-store', () => {
  const ButtonText = ref('')

  const surveyArray = ref([])
  const isSurveySet = ref(false)
  const surveyName = ref('')
  const numberOfQuestions = ref(1)
  const questionType = ref('')
  const questionContent = ref('')
  const numberOfAnswers = ref(2)
  const setAnswersArray = ([])
  const answerContentArray = ([])
  const isQuestionSet = ref(false)
  const isSurveyValid = ref(true)
  const isQuestionValid = ref(true)
  const isSurveyComplete = ref(false)

  const setSurvey = () => {
    if (surveyName.value && numberOfQuestions.value) {
      isSurveySet.value = !isSurveySet.value
      isSurveyValid.value = true
    } else {
      isSurveyValid.value = false
    }
  }

  const setQuestion = () => {
    if (questionContent.value && numberOfAnswers.value) {
      for (let i = 0; i < numberOfAnswers.value; i++) {
        setAnswersArray.push(i)
      }
      isQuestionValid.value = true
      isQuestionSet.value = true
    } else {
      isQuestionValid.value = false
    }
  }

  const saveQuestion = async () => {
    await new Promise((resolve) => {
      surveyArray.value.push({
        QuestionType: questionType.value,
        QuestionContent: questionContent.value,
        Options: answerContentArray
      })
      resolve()
    })
    const clearQuestion = () => {
      questionType.value = ''
      questionContent.value = ''
      setAnswersArray.splice(0)
      answerContentArray.splice(0)
      isQuestionSet.value = false
    }
    if (surveyArray.value.length < numberOfQuestions.value) {
      clearQuestion()
    } 
    if (surveyArray.value.length === numberOfQuestions.value) {
      isSurveyComplete.value = true
      clearQuestion()
    }
  }

  return { ButtonText, isSurveySet, surveyName, numberOfQuestions, surveyArray, questionType, questionContent, numberOfAnswers, setAnswersArray, answerContentArray, isQuestionSet, isSurveyValid, isQuestionValid, isSurveyComplete, setSurvey, setQuestion, saveQuestion }
})