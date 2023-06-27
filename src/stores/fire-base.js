import { ref } from 'vue'
import { defineStore } from 'pinia'
import { dataStore } from './data-store'
import { getDatabase, ref as fbref, push, set, remove, onValue } from 'firebase/database'
import { useRouter } from 'vue-router'


export const fireBase = defineStore('fire-base', () => {
    const store = dataStore()
    const router = useRouter()
    const mySurveys = ref([])
    const myResults = ref([])
    const dynamicSurvey = ref([])

    
    const saveSurvey = (UID) => {
        if (store.dataIndex) {
          replaceSurvey(UID, store.dataIndex)
        } else {
          const database = getDatabase()
          const surveysRef = fbref(database, `${UID}/surveys`)
          const surveyData = {
            name: store.surveyName,
            survey: [...store.surveyArray]
          }
          push(surveysRef, surveyData)
            .then(() => {
              store.surveyArray.value = []
              router.push('/my-surveys')
            })
            .catch((error) => {
              console.error('Error:', error)
            })
        }
    }
    const saveResult = (UID, SID, time, response) => {
    const database = getDatabase()
    const resultRef = fbref(database, `${UID}/results/${SID}`)
    const resultData = {
        timestamp: time,
        response: response
    }
    push(resultRef, resultData).then(() => {
        console.log('result saved')

        //Render info on page
    }).catch((error) => {
        console.error('Error:', error)
    })
    }
    const replaceSurvey = (UID, surveyId) => {
    const database = getDatabase()
    const surveyRef = fbref(database, `${UID}/surveys/${surveyId}`)
    const surveyData = {
        name: store.surveyName,
        survey: [...store.surveyArray]
    }
    set(surveyRef, surveyData)
        .then(() => {
        router.push('/my-surveys')
        })
        .catch((error) => {
        console.error('Error:', error)
        })
    }
    const deleteSurvey = (UID, surveyId) => {
    const database = getDatabase()
    const surveyRef = fbref(database, `${UID}/surveys/${surveyId}`)
    remove(surveyRef)
        .then(() => {
        console.log('Survey deleted')
        store.clearQuestion()
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
    const getResults = (UID, SID) => {
    const database = getDatabase()
    const resultsRef = fbref(database, `${UID}/results/${SID}`)
    onValue(resultsRef, (snapshot) => {
        myResults.value = snapshot.val()
    })
    }
    const getDynamicSurvey = (UID, SID, callBack = null) => {
    const database = getDatabase()
    const surveysRef = fbref(database, `${UID}/surveys/${SID}`)
    onValue(surveysRef, (snapshot) => {
        dynamicSurvey.value = snapshot.val()
        if (callBack) {
        callBack(dynamicSurvey.value)
        }
    })
    }
    return {
        mySurveys,
        myResults,
        dynamicSurvey,
        saveResult,
        saveSurvey,
        deleteSurvey,
        getSurveys,
        getResults,
        getDynamicSurvey,
    }
})