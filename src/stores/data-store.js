import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { getDatabase, ref as fbref, push, set, remove, onValue } from 'firebase/database'
export const dataStore = defineStore('data-store', () => {
  const router = useRouter()
  const buttonText = ref('')
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
  const isAnswerValid = ref(true)
  const isSurveyComplete = ref(false)
  const isEditorShown = ref(false)
  const isAddQuestion = ref(false)
  const indexToEdit = ref ('')
  const mySurveys = ref([])

  // Firebase
  const saveSurvey = (UID) => {
    const database = getDatabase();
    const surveysRef = fbref(database, `${UID}/surveys`)
    const surveyData = {
      name: surveyName.value,
      survey: [...surveyArray.value]
    }
    push(surveysRef, surveyData)
      .then(() => {
        console.log('Survey saved')
        surveyArray.value = []
        router.push('/my-surveys')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  const deleteSurvey = (UID, surveyId) => {
    const surveyRef = fbref(getDatabase(), `${UID}/surveys/${surveyId}`)
    remove(surveyRef)
      .then(() => {
        console.log('Survey deleted')
        router.push('/my-surveys')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  const getSurveys = (UID) => {
    const database = getDatabase()
    const surveysRef = fbref(database, `${UID}/surveys`)
    onValue(surveysRef, (snapshot) => {
      mySurveys.value = snapshot.val()
    })
  }

  // Building
  const setSurvey = () => {
    if (surveyName.value && numberOfQuestions) {
      isSurveySet.value = true
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
  }
  const saveQuestion = async () => {
    await new Promise((resolve) => {
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
        resolve()
        isAddQuestion.value = false
        isQuestionValid.value = true
        isAnswerValid.value = true
      }
    })
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
    isEditorShown.value = false
  }
  const openAddQuestion = (index) => {
    clearQuestion()
    isAddQuestion.value = true
  }
  const closeAddQuestion = () => {
    isAddQuestion.value = false
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
 
  return { 
    buttonText, 
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
    mySurveys,
    saveSurvey,
    deleteSurvey,
    getSurveys,
    setSurvey, 
    setQuestion, 
    saveQuestion,
    openEditor,
    openAddQuestion,
    closeAddQuestion,
    deleteQuestion,
    closeEditor
  }
})
