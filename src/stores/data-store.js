import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
export const dataStore = defineStore('data-store', () => {
  const router = useRouter()
  const surveyArray = ref([])
  const isSurveySet = ref(false)
  const surveyName = ref('')
  const numberOfQuestions = ref(1)
  const questionType = ref('')
  const questionContent = ref('')
  const numberOfAnswers = ref(2)
  const setAnswersArray = []
  const answerContentArray = []
  const isQuestionSet = ref(false)
  const isSurveyValid = ref(true)
  const isQuestionValid = ref(true)
  const isAnswerValid = ref(true)
  const isSurveyComplete = ref(false)
  const isEditorShown = ref(false)
  const isAddQuestion = ref(false)
  const isSettingsShown = ref(false)
  const isAccountShown = ref(false)
  const indexToEdit = ref('')
  const dataIndex = ref('')
  const myResults = ref([])
  const dynamicRoute = ref('')

  // Build
  const setSurvey = () => {
    if (surveyName.value && numberOfQuestions) {
      isSurveySet.value = true
      isSurveyValid.value = true
    } else {
      isSurveyValid.value = false
    }
  }
  const clearSurvey = () => {
    surveyName.value = ''
    surveyArray.value = []
    isSurveySet.value = false
    isSurveyComplete.value = false
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
    if (questionType.value === 'Text response' && isQuestionSet.value) {
      saveQuestion()
    }
  }
  const clearQuestion = () => {
    questionType.value = ''
    questionContent.value = ''
    setAnswersArray.splice(0)
    answerContentArray.splice(0)
    isQuestionSet.value = false
    numberOfAnswers.value = 2
    indexToEdit.value = ''
  }
  const saveQuestion = () => {
    if (questionType.value === 'Text response') {
      numberOfAnswers.value = 0
    }
    if (numberOfAnswers.value !== answerContentArray.length) {
      isAnswerValid.value = false
    } else {
      surveyArray.value.push({
        QuestionType: questionType.value,
        QuestionContent: questionContent.value,
        Options: [...answerContentArray]
      })
      isAddQuestion.value = false
      isQuestionValid.value = true
      isAnswerValid.value = true
    }

    if (surveyArray.value.length < numberOfQuestions.value) {
      clearQuestion()
    }
    if (surveyArray.value.length === numberOfQuestions.value) {
      isSurveyComplete.value = true
      clearQuestion()
    }
  }

  // Editing
  const openEditor = (index) => {
    indexToEdit.value = index
    isEditorShown.value = true
  }
  const closeEditor = () => {
    clearQuestion()
    isEditorShown.value = false
  }
  const openAddQuestion = (index) => {
    clearQuestion()
    isAddQuestion.value = true
  }
  const closeAddQuestion = () => {
    clearQuestion()
    isAddQuestion.value = false
    isQuestionValid.value = true
  }
  const deleteQuestion = (index) => {
    surveyArray.value.splice(index, 1)
    closeEditor()
    if (!surveyArray.value.length) {
      surveyName.value = ''
      isSurveySet.value = false
      isSurveyComplete.value = false
      clearQuestion()
      router.push('/build')
    }
  }
  const openSurvey = (survey, index) => {
    dataIndex.value = index
    surveyName.value = survey.name
    surveyArray.value = survey.survey
    router.push('/preview')
  }

  return {
    isSurveySet,
    surveyName,
    numberOfQuestions,
    surveyArray,
    questionType,
    questionContent,
    numberOfAnswers,
    setAnswersArray,
    answerContentArray,
    isQuestionSet,
    isSurveyValid,
    isQuestionValid,
    isAnswerValid,
    isSurveyComplete,
    isEditorShown,
    isAddQuestion,
    indexToEdit,
    dataIndex,
    myResults,
    isSettingsShown,
    isAccountShown,
    dynamicRoute,
    setSurvey,
    clearSurvey,
    setQuestion,
    clearQuestion,
    saveQuestion,
    openEditor,
    openAddQuestion,
    closeAddQuestion,
    deleteQuestion,
    closeEditor,
    openSurvey
  }
})
